import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black"></div>
      
      {/* Header */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 mt-16">
              <span className="text-white">Legal</span>
              <span className="text-blue-400"> Terms</span>
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
                Welcome to Corex AI. By accessing or using our website, mobile apps or services, 
                you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read them carefully.
              </p>
            </div>

            <div className="space-y-12">
              {/* Eligibility */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  1. Eligibility
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>You must be at least 13 years old to use Corex AI.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>You are responsible for all activity under your account.</p>
                  </div>
                </div>
              </section>

              {/* Subscriptions & Payments */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  2. Subscriptions & Payments
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Corex AI offers both free and paid plans. Paid plans renew automatically unless canceled.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Prices may change, but you will always be notified in advance.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Refunds: You may request a refund within 14 days of purchase if the product is defective or not as described.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>To request: email corexai.app@gmail.com with your order details.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>We will review requests within 3 business days.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Refunds may not be granted if services were fully delivered or subscriptions were heavily used.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>No refunds are given for partial subscription periods.</p>
                  </div>
                </div>
              </section>

              {/* Usage Limits */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  3. Usage Limits
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Creator plan users may generate up to 150 scripts. (Most creators never hit this limit; it exists to ensure fair use for all.)</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Abuse of the system to bypass limits is prohibited.</p>
                  </div>
                </div>
              </section>

              {/* Content Ownership */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  4. Content Ownership
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Any script or content you generate with Corex AI is yours to use freely.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>However, you are responsible for how you use generated content (e.g., avoiding copyright infringement, harmful, or illegal uses).</p>
                  </div>
                </div>
              </section>

              {/* Prohibited Activities */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  5. Prohibited Activities
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>You may not:</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use Corex AI to create harmful, abusive, or illegal content.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Attempt to hack, overload, or exploit the platform.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Resell or redistribute Corex AI without written permission.</p>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  6. Disclaimer
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Corex AI is provided &quot;as-is&quot; without warranties of any kind. We do not guarantee specific outcomes (e.g., going viral), though we optimize for high performance.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We are not liable for any damages, losses, or claims arising from the use or inability to use Corex AI.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  8. Changes to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update these Terms occasionally. Continued use of Corex AI means you accept the updated Terms.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  9. Contact
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Questions? Email{" "}
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