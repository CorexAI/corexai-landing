import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black"></div>
      
      {/* Header */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 mt-16">
              <span className="text-white">Privacy</span>
              <span className="text-blue-400"> Policy</span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Last updated: August 25, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-invert prose-xl max-w-none">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <p className="text-gray-300 text-center text-xl leading-relaxed">
                At Corex AI, your privacy matters. This policy explains how we handle your data.
              </p>
            </div>

            <div className="space-y-12">
              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Account info:</strong> Name, email, login details.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Usage data:</strong> Number of scripts generated, Number of hooks generated, activity logs.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong>Payment info:</strong> Handled securely by third-party processors (we do not store card details).</p>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  2. How We Use Information
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>To provide and improve our AI services.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>To personalize script generation.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>For security and platform stability.</p>
                  </div>
                </div>
              </section>

              {/* Sharing of Data */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  3. Data Sharing
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>We never sell your data.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>We only share with trusted third parties (e.g., payment processors, hosting services) required to operate Corex AI.</p>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  4. Your Rights
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  You may request deletion of your account and data anytime by emailing{" "}
                  <a href="mailto:corexai.app@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    corexai.app@gmail.com
                  </a>
                </p>
              </section>

              {/* Security */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  5. Security
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We use encryption and industry-standard measures to protect your information.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  6. Changes to Policy
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy. For major changes, we'll notify you directly.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  7. Contact
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Questions about privacy? Email{" "}
                  <a href="mailto:corexai.app@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    corexai.app@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 