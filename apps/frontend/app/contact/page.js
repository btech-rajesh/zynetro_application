import { contactMethods } from "../../lib/siteContent";

export const metadata = {
  title: "Contact Zynetra",
  description: "Reach Zynetra for consultations, project discussions, and service inquiries."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Start the conversation through your preferred channel
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Use the website consultation form for project intake, or reach out directly for business
            questions, partnership discussions, and delivery planning.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((item) => (
              <article key={item.label} className="bg-gray-900 border border-white/[0.06] rounded-2xl p-8 hover:border-orange-500/30 transition-colors text-center">
                <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">{item.label}</p>
                <h3 className="text-xl font-bold text-white mb-2">{item.value}</h3>
                {item.detail && <p className="text-sm text-gray-400">{item.detail}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gray-900 border border-white/[0.08] rounded-3xl p-10">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Primary Route</p>
              <h2 className="text-3xl font-bold text-white mb-4">Best Path for Project Inquiries</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                For serious project requests, the homepage consultation form is the primary intake channel. 
                It ensures your requirements are captured and helps us prepare for our conversation.
              </p>
              <a href="/#consultation-form" className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-colors">
                Go to Consultation Form
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Alternative</p>
              <h2 className="text-3xl font-bold text-white mb-4">Direct Reach Out</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Have a specific question or want to discuss partnership opportunities? Reach out directly 
                via email or phone and we will respond within 24 hours.
              </p>
              <div className="space-y-2">
                <a href="mailto:krajeshpachori@gmail.com" className="block text-orange-400 hover:text-orange-300 font-medium">
                  krajeshpachori@gmail.com
                </a>
                <a href="tel:+918630394151" className="block text-orange-400 hover:text-orange-300 font-medium">
                  +91 8630394151
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
