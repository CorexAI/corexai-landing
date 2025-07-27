export const metadata = {
  title: "Privacy Policy – Corex AI",
  description: "Corex AI Privacy Policy. Learn how we collect, use, and protect your data when using our viral script generator AI tool.",
  openGraph: {
    title: "Privacy Policy – Corex AI",
    description: "Corex AI Privacy Policy. Learn how we collect, use, and protect your data when using our viral script generator AI tool.",
    url: "https://corexai.app/privacy",
    siteName: "Corex AI",
    type: "website",
  },
};

export default function Privacy() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/60 via-black to-black opacity-80 blur-2xl" />
      <div className="max-w-3xl mx-auto pt-8 pb-16 md:py-16 px-4 md:px-8 text-white font-sans">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-400 text-center">Privacy Policy</h1>
        <p className="mb-6 text-gray-400 text-center text-lg">Last Updated: July 20, 2025</p>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Information We Collect</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">Account info: Name, email, login details, number of scripts you generate.<br/>Usage data: Ideas you input, generated scripts, and how you interact with the platform.<br/>Payment info: Processed securely by third-party services, we never store your payment details.</p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">How We Use Your Information</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">To generate personalized scripts and improve our AI models.</p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Sharing of Data</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">We never sell your data. We only share with trusted services needed to operate (e.g., payment processors).</p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Your Rights</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">You can request deletion of your account and data by contacting <a href="mailto:corexai.app@gmail.com" className="text-blue-400 underline">corexai.app@gmail.com</a></p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Security</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">We use encryption and industry-standard practices to protect your data.</p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Changes to Privacy Policy</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">We may update this policy, and we’ll notify you of any major changes.</p>
        </section>
        <div className="border-t border-gray-800 my-8" />

        <section className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 text-left">Contact</h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-left">Questions? Email <a href="mailto:corexai.app@gmail.com" className="text-blue-400 underline">corexai.app@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
} 