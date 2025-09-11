import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { requireAuth } from '@/lib/auth-utils';
import { checkUsageLimit, incrementUsage } from '@/lib/usageTracking-server.js';

export async function POST(request) {
  try {
    // Step 1: Check if Firebase Admin is available
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
      console.error('❌ Firebase Admin not configured - missing environment variables');
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: 'Firebase Admin service is not properly configured. Please contact support.'
      }, { status: 500 });
    }

    // Step 2: Authenticate user
    const authenticatedUser = await requireAuth(request);
    console.log('🔐 Authenticated user:', authenticatedUser.uid);

    // Step 3: Validate request body
    const { topic, tone, audience, platform } = await request.json();

    if (!topic || !tone || !audience || !platform) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'Please provide topic, tone, audience, and platform.'
      }, { status: 400 });
    }

    // Step 4: Check usage limits BEFORE processing
    let usageCheck;
    try {
      usageCheck = await checkUsageLimit(authenticatedUser.uid, 'hook');
    } catch (usageError) {
      console.error('❌ Usage limit check failed:', usageError);
      return NextResponse.json({ 
        error: 'Usage tracking error',
        details: 'Failed to check usage limits. Please try again.'
      }, { status: 500 });
    }
    
    if (!usageCheck.allowed) {
      return NextResponse.json({ 
        error: 'Usage limit exceeded',
        details: usageCheck.message || 'You have reached your hook generation limit. Please upgrade your plan or wait for reset.'
      }, { status: 429 });
    }

    console.log('✅ Usage check passed:', usageCheck.currentUsage);

    // Step 5: Check if OpenAI API key is configured
    if (!process.env.HOOK_OPENAI_API_KEY) {
      console.error('❌ HOOK_OPENAI_API_KEY is not configured');
      return NextResponse.json({ 
        error: 'OpenAI API not configured',
        details: 'Please contact support to configure the AI service.'
      }, { status: 500 });
    }

    // Step 6: Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.HOOK_OPENAI_API_KEY,
    });

    // Step 7: Create the prompt
    const prompt = `Use GPT-4o-mini to generate 3 unique 1–2 line hooks based on the following input:

Tone: ${tone}
Audience: ${audience}
Platform: ${platform}
Idea: "${topic}"

Rules:
- Hooks must stop scrolls instantly using curiosity, emotion, or a bold stat.
- Keep each hook punchy (10–15 words), human, and scroll-stopping.
- Always detect the input language and respond in the exact same language. Never switch to English unless the user explicitly asks.
- Idea input is limited to 150 characters; truncate if longer.
- IMPORTANT : do not use emojis
- IMPORTANT : do not use air strikes (**) in output format
- IMPORTANT :Follow this exact Output format:

Hook 1:
Hook 2:
Hook 3:`;

    console.log('🚀 Starting OpenAI API call...');
    
    let stream;
    try {
      stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        stream: true,
      });
    } catch (openaiError) {
      console.error('❌ OpenAI API Error:', openaiError);
      
      if (openaiError.status === 401) {
        return NextResponse.json({ 
          error: 'OpenAI API authentication failed',
          details: 'Invalid API key or authentication error.'
        }, { status: 500 });
      } else if (openaiError.status === 429) {
        return NextResponse.json({ 
          error: 'OpenAI API rate limit exceeded',
          details: 'Too many requests to OpenAI. Please try again later.'
        }, { status: 500 });
      } else {
        return NextResponse.json({ 
          error: 'OpenAI API error',
          details: openaiError.message || 'Failed to connect to OpenAI service.'
        }, { status: 500 });
      }
    }

    console.log('✅ OpenAI stream created successfully');

    // Step 8: Create a ReadableStream to handle the response
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = '';
          
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              fullResponse += content;
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          
          console.log('✅ Stream processing completed');
          
          // Step 9: Increment usage AFTER successful generation
          try {
            await incrementUsage(authenticatedUser.uid, 'hook', 1);
            console.log('✅ Usage incremented successfully');
          } catch (incrementError) {
            console.error('❌ Failed to increment usage:', incrementError);
            // Don't fail the request if usage tracking fails
          }
          
          controller.close();
        } catch (error) {
          console.error('❌ Error processing stream:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('❌ Hook generation failed:', error);
    
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json({ 
        error: 'Authentication failed',
        details: 'Please sign in again.'
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: 'Failed to generate hooks. Please try again.'
    }, { status: 500 });
  }
}
