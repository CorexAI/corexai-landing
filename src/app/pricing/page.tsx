import { FiCheck, FiX } from "react-icons/fi";

export const metadata = {
  title: "Pricing – Corex AI",
  description: "Compare Corex AI plans: Free (3 scripts/week, basic hooks) vs. Premium (unlimited scripts, advanced hooks, exclusive tones, priority support). Choose the plan that fits your creator journey.",
  openGraph: {
    title: "Pricing – Corex AI",
    description: "Compare Corex AI plans: Free (3 scripts/week, basic hooks) vs. Premium (unlimited scripts, advanced hooks, exclusive tones, priority support). Choose the plan that fits your creator journey.",
    url: "https://corexai.app/pricing",
    siteName: "Corex AI",
    images: [
      {
        url: "/og web final.png",
        width: 1200,
        height: 630,
        alt: "Corex AI Pricing",
      },
    ],
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">Premium Creator</h1>
      <p className="text-xl md:text-2xl text-blue-400 text-center mb-12 font-medium">Your Netflix subscription won&apos;t make you viral. $9.99 will.</p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Premium Plan */}
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-black rounded-2xl p-10 flex flex-col items-start border-2 border-blue-400 shadow-2xl md:scale-105 z-10">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</span>
          </div>
          <div className="absolute inset-0 rounded-2xl pointer-events-none drop-shadow-[0_0_60px_rgba(0,52,184,0.7)]" />
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Premium Plan</h2>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">$9.99</span>
              <span className="text-lg md:text-xl text-gray-300">/month</span>
            </div>
            <p className="text-sm text-gray-400">Cancel anytime • No setup fees</p>
          </div>
          <ul className="text-base md:text-lg mb-8 space-y-4 w-full">
            <li className="flex items-center gap-2 text-blue-100 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Trained on viral videos
            </li>
            <li className="flex items-center gap-2 text-blue-100 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Unlimited Scripts
            </li>
            <li className="flex items-center gap-2 text-blue-100 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Advance and Viral Hooks
            </li>
            <li className="flex items-center gap-2 text-blue-100 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Access to exclusive tones & formats
            </li>
            <li className="flex items-center gap-2 text-blue-100 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Priority Support
            </li>
          </ul>
        </div>
        {/* Free Plan */}
        <div className="bg-gray-900 rounded-2xl p-10 flex flex-col items-start border border-blue-700">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Free Plan</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-gray-300">$0</span>
              <span className="text-lg md:text-xl text-gray-400">/month</span>
            </div>

          </div>
          <ul className="text-base md:text-lg mb-8 space-y-4 w-full">
            <li className="flex items-center gap-2 text-gray-300 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Basic Model
            </li>
            <li className="flex items-center gap-2 text-gray-300 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> 3 Scripts Per Week
            </li>
            <li className="flex items-center gap-2 text-gray-300 font-semibold">
              <FiCheck className="text-blue-400 text-lg" /> Basic Hook Generation
            </li>
            <li className="flex items-center gap-2 text-gray-400 line-through">
              <FiX className="text-gray-500 text-lg" /> No Early Access
            </li>
            <li className="flex items-center gap-2 text-gray-400 line-through">
              <FiX className="text-gray-500 text-lg" /> No advance Scripts
            </li>
          </ul>
        </div>
      </div>
      
      {/* App Store Buttons */}
      <div className="flex gap-4 mt-12 flex-wrap justify-center">
        <button className="bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md opacity-60" disabled>
          App Store (Coming Soon)
        </button>
        <button className="bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md opacity-60" disabled>
          Play Store (Coming Soon)
        </button>
      </div>
    </div>
  );
} 