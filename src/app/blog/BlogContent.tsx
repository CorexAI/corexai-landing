"use client";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineUser, HiOutlineCalendar } from "react-icons/hi";
import Link from "next/link";
import ClientFooter from "./ClientFooter";

const blogPosts = [
  {
    id: 1,
    title: "The Secret Formula to Going Viral on TikTok in 2025 (No One Tells You This)",
    excerpt: "In 2025, content creators have less than 3 seconds to hook an audience before they scroll away. The brutal truth? Most creators fail not because of bad ideas, but because of weak scripts. That's where AI video script generators change the entire game.",
    readTime: "12 min read",
    author: "Corex AI Team",
    date: "July 15, 2025",
    category: "Viral Strategy",
    featured: true,
    url: "/blog/secret-formula-going-viral-tiktok-2025",
    content: `In 2025, content creators have less than 3 seconds to hook an audience before they scroll away. The brutal truth? Most creators fail not because of bad ideas, but because of weak scripts. That's where AI video script generators change the entire game.

## Why AI Script Generators Are a Game-Changer

Forget spending hours staring at a blank screen. With AI:
- You input your idea → it spits out a full script in seconds
- Hooks are optimized for TikTok, Instagram Reels, and YouTube Shorts
- AI studies viral trends + psychology triggers to craft scroll-stopping scripts

Instead of wasting time on brainstorming, you're instantly equipped with ready-to-shoot viral scripts.

## Benefits of Using an AI Video Script Generator

✅ **Save 10+ hours per week** – No more manual scripting
✅ **Never run out of ideas** – AI keeps you trending
✅ **Consistent quality** – Each script is engaging & structured
✅ **Virality built-in** – Designed to stop the scroll
✅ **Easy repurposing** – One idea, multiple scripts

## How It Works (Step-by-Step)

1. Enter your idea (example: "motivation for students")
2. Choose a tone (motivational, storytelling, persuasive, professional)
3. AI generates a full 60-second viral script
4. Copy, shoot, upload → watch your engagement blow up

**Example Input:** "How to stay consistent in the gym"
👉 **Output:** Hook, storytelling beats, escalation, emotional punch, and a killer outro with a CTA.

## Best AI Script Generators in 2025

🔥 **Corex AI** – The GOAT of viral scripting. Detects your language, generates hooks, and builds scripts optimized for TikTok, Reels, and Shorts.

🔥 **Jasper AI** – Great for long-form, but limited for short-form virality.

🔥 **Copy.ai** – Solid, but lacks scene-by-scene storytelling.

🔥 **Writesonic** – Better for blog posts, not micro-video scripting.

👉 If you want viral TikTok-ready scripts, **Corex AI dominates**.

## Why Corex AI Wins for Creators

- Detects your idea instantly
- Auto-generates a viral hook that feels native to TikTok culture
- Scene-by-scene script format → easy to shoot
- Tones: Motivational, Storytelling, Professional, Persuasive
- Free plan: 3 ideas/week
- Premium plan: $9.99/month for unlimited access

Corex AI isn't just a tool. It's your shortcut to going viral without wasting time.

## Real-World Example

Imagine you're a creator with only 500 followers.
👉 You use Corex AI.
👉 Your 1st video hits 50K views.
👉 Your 2nd crosses 200K.

That's the power of AI scripting.

## Final Words – Stop Guessing, Start Going Viral

Creators who keep "winging it" will stay stuck. The future belongs to those who leverage AI to craft hooks, scripts, and content that blows up instantly.

👉 If you're ready to stop wasting hours and finally go viral → try **Corex AI** (corex.app) today.`
  },
  {
    id: 2,
    title: "Top 5 Hooks That Make Your TikTok Go Viral in 2025",
    excerpt: "Want your TikToks to explode in 2025? Discover the 5 scroll-stopping hooks proven to boost watch time, engagement, and virality. Copy these exact formulas now!",
    readTime: "9 min read",
    author: "Corex AI Team",
    date: "July 12, 2025",
    category: "Content Creation",
    featured: false,
    url: "/blog/top-5-hooks-tiktok-viral-2025"
  },
  {
    id: 3,
    title: "Why 90% of Short-Form Videos Fail (And How to Be in the Winning 10%)",
    excerpt: "Most creators are failing at short-form video in 2025. Here's why — and exactly how you can be in the 10% that dominates TikTok, Reels, and Shorts.",
    readTime: "11 min read",
    author: "Corex AI Team",
    date: "January 10, 2025",
    category: "Content Strategy",
    featured: false,
    url: "/blog/why-90-percent-short-form-videos-fail"
  },
  {
    id: 4,
    title: "The Psychology Behind Viral Content: Why Some Videos Explode While Others Flop",
    excerpt: "Understanding the psychology of viral content is the key to creating videos that spread like wildfire. Learn the science behind what makes content shareable.",
    readTime: "8 min read",
    author: "Corex AI Team",
    date: "January 8, 2025",
    category: "Psychology",
    featured: false,
    url: "/blog/psychology-behind-viral-content"
  },
  {
    id: 5,
    title: "Building Consistency for Long-Term Growth: The Creator's Guide to Sustainable Success",
    excerpt: "Consistency is the secret weapon of successful creators. Learn how to build sustainable content creation habits that lead to long-term growth and success.",
    readTime: "10 min read",
    author: "Corex AI Team",
    date: "January 5, 2025",
    category: "Growth Strategy",
    featured: false,
    url: "/blog/building-consistency-long-term-growth"
  },
  {
    id: 6,
    title: "Viral Hooks That Work in Every Niche: Universal Formulas for Content Success",
    excerpt: "Discover the universal hook formulas that work across all niches and industries. These proven patterns will help you create engaging content regardless of your topic.",
    readTime: "7 min read",
    author: "Corex AI Team",
    date: "January 3, 2025",
    category: "Content Creation",
    featured: false,
    url: "/blog/viral-hooks-work-every-niche"
  },
  {
    id: 7,
    title: "Storytelling Secrets for TikTok, Instagram Reels, and YouTube Shorts",
    excerpt: "Master the art of storytelling in short-form video. Learn how to craft compelling narratives that keep viewers engaged from start to finish.",
    readTime: "9 min read",
    author: "Corex AI Team",
    date: "December 30, 2024",
    category: "Storytelling",
    featured: false,
    url: "/blog/storytelling-secrets-tiktok-instagram-reels"
  },
  {
    id: 8,
    title: "AI vs Human Creativity: The Showdown That's Changing Content Creation Forever",
    excerpt: "Explore the evolving relationship between AI and human creativity in content creation. Discover how to leverage both for maximum impact and efficiency.",
    readTime: "11 min read",
    author: "Corex AI Team",
    date: "December 28, 2024",
    category: "AI & Technology",
    featured: false,
    url: "/blog/ai-vs-human-creativity-showdown"
  },
  {
    id: 9,
    title: "The Rise of Micro-Content in 2025: Why Shorter is Better for Viral Success",
    excerpt: "Micro-content is dominating social media in 2025. Learn why shorter videos are outperforming longer content and how to optimize for this trend.",
    readTime: "6 min read",
    author: "Corex AI Team",
    date: "December 25, 2024",
    category: "Trends",
    featured: false,
    url: "/blog/rise-micro-content-2025"
  },
  {
    id: 10,
    title: "Monetization Strategies for Content Creators in 2025: Beyond the Algorithm",
    excerpt: "Learn the most effective monetization strategies for content creators in 2025. Discover how to build multiple income streams beyond just platform revenue.",
    readTime: "10 min read",
    author: "Corex AI Team",
    date: "December 22, 2024",
    category: "Monetization",
    featured: false,
    url: "/blog/monetization-strategies-content-creators-2025"
  },
  {
    id: 11,
    title: "The Future of Content Creation in 2030: What Creators Need to Know Now",
    excerpt: "Get ahead of the curve with insights into the future of content creation. Learn what trends and technologies will shape the creator economy in 2030.",
    readTime: "12 min read",
    author: "Corex AI Team",
    date: "December 18, 2024",
    category: "Future Trends",
    featured: false,
    url: "/blog/future-content-creation-2030"
  }
];

export default function BlogContent() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-blue-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-100 left-2/3 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-120 right-1/4 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce delay-5000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="text-center py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-24"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              The CorexBlog
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert insights on TikTok strategy, Instagram Reels optimization, YouTube Shorts, and AI-powered script generation. Learn from industry experts.
            </p>
          </motion.div>
        </header>

        {/* Featured Post */}
        <section className="max-w-6xl mx-auto px-4 mb-8">
          {blogPosts.filter(post => post.featured).map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 border border-blue-400/20 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-6">
                <span className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2 text-blue-300 font-semibold text-sm tracking-wider uppercase">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                {post.title}
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link
                href={post.url}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Read Full Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.article>
          ))}
        </section>

        {/* All Posts Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Articles</h2>
            <p className="text-gray-400 text-lg">Discover the latest insights on viral content creation and social media strategy.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <Link
                key={post.id}
                href={post.url}
                className="block"
              >
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * index }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1 text-blue-300 font-semibold text-xs tracking-wider uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs mb-4">
                    <div className="flex items-center gap-1">
                      <HiOutlineUser className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineCalendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm">
                    Read More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <ClientFooter />
    </div>
  );
}
