"use client";
import { useRef, useEffect } from "react";

const testimonials = [
  {
    name: "Sara K.",
    role: "Lifestyle Creator",
    text: "I posted 49 videos with zero traction. My first Corex AI script hit 120K views overnight. This app is literally a cheat code.",
    avatar: null,
  },
  {
    name: "Imran S.",
    role: "E-Commerce Brand Owner",
    text: "I used to spend hours figuring out what to say. Corex AI gave me a 60‑second script in seconds — and my promo video got 3x more engagement.",
    avatar: null,
  },
  {
    name: "Jake R.",
    role: "New Instagram Creator",
    text: "I had ideas but didn’t know how to make them viral. Corex AI gave me hooks, B‑roll ideas, and a CTA in one go. My first reel blew up!",
    avatar: null,
  },
  {
    name: "Alex R.",
    role: "Fitness Coach",
    text: "Writing scripts used to take me hours. Now I drop an idea in Corex AI, and boom — 60 seconds later, I’ve got a viral-ready script.",
    avatar: null,
  },
  {
    name: "YouOnFire",
    role: "Meme Page Owner",
    text: "I used to write my own hooks. LOL. Corex AI does it in 5 seconds while I’m eating nuggets. Viral game = hacked.",
    avatar: null,
  },
  {
    name: "Mukesh L.",
    role: "Vlogger",
    text: "My brain: ‘You can write your own scripts.’\nCorex AI: laughs in viral hooks.\nYeah, I switched. Now I’m trending while my brain’s still loading.",
    avatar: null,
  },
  {
    name: "SamReels",
    role: "IG Reels",
    text: "I used to spend 3 hours on 10 words. Corex AI? Boom. Hook. Script. Done. Now I have time to touch grass.",
    avatar: null,
  },
];

export default function TestimonialSlider() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    let animationId: number;
    let start: number | null = null;
    const scrollWidth = ticker.scrollWidth / 2;
    const speed = 60; // px per second

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const distance = (elapsed / 1000) * speed;
      if (ticker) {
        ticker.scrollLeft = distance % scrollWidth;
      }
      animationId = requestAnimationFrame(step);
    }
    
    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate testimonials for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="w-full max-w-full overflow-x-hidden py-12 bg-transparent">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">What Creators Say</h2>
      <div
        ref={tickerRef}
        className="relative flex flex-nowrap gap-6 overflow-x-scroll scrollbar-hide"
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="min-w-[320px] max-w-xs bg-gradient-to-br from-blue-900/60 via-black to-black rounded-xl p-6 shadow-lg border border-blue-700 flex flex-col items-center mx-2 flex-shrink-0"
          >
            {/* Avatar Placeholder */}
            <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-3xl font-bold text-white mb-4 border-4 border-blue-400">
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="text-gray-200 mb-4 text-center whitespace-pre-line">“{t.text}”</p>
            <span className="text-blue-400 font-semibold text-center block mb-2">— {t.name}, {t.role}</span>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
} 