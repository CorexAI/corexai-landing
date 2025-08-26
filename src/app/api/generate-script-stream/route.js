import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { requireAuth } from '@/lib/auth-utils';
import { checkUsageLimit, incrementUsage } from '@/lib/usageTracking-server.js';

const openai = new OpenAI({
  apiKey: process.env.SCRIPT_OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    // Step 1: Authenticate user
    const authenticatedUser = await requireAuth(request);
    console.log('🔐 Authenticated user:', authenticatedUser.uid);

    // Step 2: Validate request body
    const { topic, scriptLength, tone, audience, platform } = await request.json();

    if (!topic || !scriptLength || !tone || !audience || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Step 3: Check usage limits BEFORE processing
    const usageCheck = await checkUsageLimit(authenticatedUser.uid, 'script');
    if (!usageCheck.allowed) {
      return NextResponse.json({ 
        error: 'Usage limit exceeded', 
        message: usageCheck.message 
      }, { status: 429 });
    }

    console.log('🚀 Script generation request:', { topic, scriptLength, tone, audience, platform, uid: authenticatedUser.uid });

    let prompt;
    
    if (scriptLength === '30 seconds' || scriptLength === '30s') {
      // 30 SECOND SCRIPT TEMPLATE
      prompt = `${topic} | ${platform} | ${tone} | ${audience}

Rules :
- 30-Second Viral Script Rules Total words:
- 65–80 (that's ~30s average speaking pace). 
- Scene 1 (Hook): Max 12 words. Must shock, question, or slap curiosity. (~5s)
- Scene 2 (Context/Build): 18–22 words. Add emotion or story spark. (~8s) 
- Scene 3 (Escalation/Climax): 20–24 words. Energy rises, drop tension or twist. (~10s)
- Scene 4 (CTA/Outro): 10–14 words. Direct, punchy, emotional CTA. (~7s)
- CRITICAL: NEVER use ** (asterisks) anywhere in the output
- CRITICAL: NEVER use emojis anywhere in the output
- CRITICAL: Output format must be exactly as shown below with NO asterisks
- OUTPUT FORMAT (NO ASTERISKS):

Scene 1: Hook:
Voice: Drop the wildest, WTF-level hook that shocks/confuses/intrigues instantly. (One line, max 10 words.)
B-Roll: Easily phone shotable,  Fast, punchy visual must match ${topic} and ${tone} 
Scene 2:
Voice: Add quick emotional/context line. Make viewer FEEL why it matters.
B-Roll:  Add B-Roll which is easily shootable from phone, based on ${topic}, based on actor.
Scene 3:
Voice: Push tension higher — "Here's the crazy part…" (keep it short).
B-Roll: Use dynamic footage: zooms, graphs rising, chaos visuals, or symbolic clips.
Scene 4: CTA:
Voice: Deliver punchline, twist, or call-to-action (must feel inevitable).
B-Roll: Phone Shotable easily, one actor, must match the video.

REMEMBER: NO ASTERISKS (**) ANYWHERE IN THE OUTPUT!`;
    } else if (scriptLength === '60 seconds' || scriptLength === '60s') {
      // 60 SECOND SCRIPT TEMPLATE
      prompt = `${topic} | ${platform} | ${tone} | ${audience}
 --- RULES --- 
1. Script ~60 seconds (~140 words max). 
2. 8 micro-scenes, ~7–8s each. 
3. Voice escalates → climax → CTA. 
4. Hook must stop scroll; CTA direct and brutal. 
5. B-Roll matches emotion, tone, pacing. 
6. No filler, robotic phrasing, or banned words. 
7. CRITICAL: NEVER use ** (asterisks) anywhere in the output
8. CRITICAL: NEVER use emojis anywhere in the output
9. CRITICAL: Output format must be exactly as shown below with NO asterisks

--- OUTPUT FORMAT (NO ASTERISKS) --- 

Scene 1: Hook:
Voice: WTF-level hook about ${topic} for ${audience} on ${platform} using ${tone}. (~8 words) 
B-Roll: must be phone shootable, single actor. 
Scene 2:
Voice: Quick context why ${topic} matters to ${audience}. (~15 words) 
B-Roll: Relatable clip, single actor. 
Scene 3:
Voice: Highlight problem/stakes rising for ${audience}. (~15 words) 
B-Roll: Fast cuts, chaos or tension visuals. 
Scene 4:
Voice: Mini-twist or reveal to spark urgency. (~15 words) 
B-Roll: must be phone shootable, single actor. according to the ${topic} 
Scene 5:
Voice: Push escalation — "here's the crazy part" about ${topic}. (~15 words) 
B-Roll: Quick-cut sequences, symbolic visuals. 
Scene 6:
Voice: Climax — solution or insight for ${audience} on ${platform}. (~15 words) 
B-Roll: must be phone shootable, single actor. according to scene 6. 
Scene 7:
Voice: Show results, impact, or transformation from ${topic}. (~12 words)
B-Roll: Before/after contrast, celebratory shot. 
Scene 8: CTA:
Voice: Brutal, direct platform-specific CTA for ${audience} to act. (~10 words) 
B-Roll: High-energy shot, bold text overlay, single actor.

REMEMBER: NO ASTERISKS (**) ANYWHERE IN THE OUTPUT!`;
    } else {
      // 90 SECOND SCRIPT TEMPLATE
      prompt = `${topic} | ${platform} | ${tone} | ${audience}

RULES :
- Each scene must be around ~9seconds
- Each Voice line must be 15-18 words
- CRITICAL: NEVER use ** (asterisks) anywhere in the output
- CRITICAL: NEVER use emojis anywhere in the output
- CRITICAL: Output format must be exactly as shown below with NO asterisks

OUTPUT FORMAT (NO ASTERISKS):

Scene 1:
Hook: Shock ${audience} with a bold stat or question about ${topic} in 10–12 words. B-Roll: Dynamic, single-actor phone shot, vivid, grabs attention instantly.
Scene 2:
Voice: Explain why ${topic} is critical for ${audience}.
B-Roll: Relatable single-actor action, mirrors ${audience}'s daily life.
Scene 3:
Voice: Expose ${audience}'s core struggle with ${topic}.
B-Roll: Chaotic phone-shot visual, single actor, reflects pain point.
Scene 4:
Voice: Drop a counterintuitive fact about ${topic} to spark urgency,
B-Roll: Quick phone-shot transition, single actor, aligns with ${topic}.
Scene 5:
Voice: Amp up: "Here's the game-changer for ${topic}!"
B-Roll: Fast-paced, symbolic phone-shot cuts, matches ${tone}.
Scene 6:
Voice: Hit with a surprising stat or angle on ${topic}
B-Roll: High-energy phone-shot, single actor, ties to ${topic}.
Scene 7:
Voice: Tease the big solution for ${audience} with ${topic}
B-Roll: Focused single-actor shot, confident, phone-shot, ${tone}-aligned.
Scene 8:
Voice: Deliver clear, actionable ${topic} solution for ${platform}
B-Roll: Bold single-actor phone-shot, high-energy, mirrors ${topic}.
Scene 9:
Voice: Show ${audience}'s transformation from ${topic}
B-Roll: Joyful single-actor phone-shot, celebratory, matches ${tone}.
Scene 10:
CTA: Direct ${platform}-specific CTA for ${audience} to act now, 10–12 words.
B-Roll: Rapid symbolic phone-shots, single actor, drives ${topic}.

REMEMBER: NO ASTERISKS (**) ANYWHERE IN THE OUTPUT!`;
    }

    console.log('🚀 Starting OpenAI API call...');
    
    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    console.log('✅ OpenAI stream created successfully');

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          console.log('📝 Starting stream processing...');
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              // Remove any asterisks that might slip through
              const cleanedText = text.replace(/\*\*/g, '');
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: cleanedText })}\n\n`));
            }
          }
          console.log('✅ Stream processing completed');
          
          // Step 4: Increment usage AFTER successful generation
          try {
            await incrementUsage(authenticatedUser.uid, 'script', 1);
            console.log('📊 Usage incremented successfully');
          } catch (usageError) {
            console.error('❌ Failed to increment usage:', usageError);
            // Don't fail the request if usage tracking fails
          }
          
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (streamError) {
          console.error('❌ Stream processing error:', streamError);
          controller.error(streamError);
        }
      },
    });

    console.log('📤 Returning response stream');

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: 'Failed to generate script',
      details: error.message 
    }, { status: 500 });
  }
}
