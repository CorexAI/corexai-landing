import Image from "next/image";
import AnimatedSections from "./AnimatedSections";

export const metadata = {
  title: "Corex AI – Viral Script Generator",
  description: "AI That Writes Viral Scripts.",
  openGraph: {
    title: "Corex AI – Viral Script Generator",
    description: "AI That Writes Viral Scripts.",
    url: "https://corexai.app",
    siteName: "Corex AI",
    images: [
      {
        url: "/og web final.png",
        width: 1200,
        height: 630,
        alt: "Corex AI – Viral Script Generator",
      },
    ],
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white">
      {/* Hero Section (static) */}
      <section
        className="w-full flex flex-col md:flex-row justify-between pt-12 md:pt-24 pb-16 px-4 md:px-40 relative overflow-hidden"
      >
        <div className="flex flex-col flex-1">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 text-white drop-shadow-lg text-left">
            Stop Guessing.<br />Start Trending.
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 mt-[18px] font-medium">
            AI That Writes Viral Scripts.
          </p>
          <div className="flex gap-4 mb-12 mt-4 flex-wrap justify-start">
            <button className="bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md opacity-60" disabled>
              App Store (Coming Soon)
            </button>
            <button className="bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg px-6 py-3 font-semibold text-lg shadow-md opacity-60" disabled>
              Play Store (Coming Soon)
            </button>
          </div>
          <div className="flex md:hidden justify-center items-center mt-6">
            <Image
              src="/mockup1 web.png"
              alt="Corex AI mobile app interface showing viral script generation features"
              width={480}
              height={480}
              className="object-contain relative drop-shadow-[0_0_36px_rgba(0,52,184,0.6)] w-[480px] h-[480px]"
              priority
              quality={85}
            />
          </div>
        </div>
        <div className="hidden md:flex flex-shrink-0 ml-0 md:ml-[8px] -mt-16 md:relative justify-center items-center">
          <Image
            src="/mockup1 web.png"
            alt="Corex AI mobile app interface showing viral script generation features"
            width={550}
            height={550}
            className="object-contain relative drop-shadow-[0_0_36px_rgba(0,52,184,0.6)]"
            priority
            quality={85}
          />
        </div>
      </section>
      <AnimatedSections />
    </div>
  );
}
