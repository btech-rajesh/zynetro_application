import { pricingPlans } from "../../lib/siteContent";

export const metadata = {
  title: "Zynetra Pricing",
  description: "Explore pricing paths for launch sprints, growth builds, and automation projects."
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Engagement models built for different stages of business growth
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Final pricing depends on scope, integrations, and delivery speed. These starting points help
            qualify the right fit before your consultation call.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <article key={plan.title} className="bg-gray-900 border border-white/[0.08] rounded-2xl p-7 shadow-lg hover:border-orange-500/30 transition-all duration-300 flex flex-col">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50/10 rounded-full mb-4 self-start">
                  {plan.title}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2">{plan.price}</h2>
                <p className="text-gray-400 mb-6 flex-1 leading-relaxed">{plan.summary}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-orange-600 rounded-3xl p-10 text-center">
          <p className="text-orange-200 text-xs font-semibold tracking-widest uppercase mb-3">Ready to start?</p>
          <h2 className="text-3xl font-bold text-white mb-4">Get a custom quote for your project</h2>
          <p className="text-orange-100 mb-8">Book a free consultation to discuss scope, timeline, and pricing.</p>
          <a href="/#consultation-form" className="inline-block px-7 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
            Schedule Consultation →
          </a>
        </div>
      </section>
    </main>
  );
}
