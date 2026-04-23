import { companyValues } from "../../lib/siteContent";

export const metadata = {
  title: "About Zynetra",
  description: "Learn how Zynetra approaches service websites, backend systems, and automation delivery."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-4">About Zynetra</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            We build digital systems that help service businesses sell and deliver better
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Zynetra combines strategic UX, backend engineering, and automation thinking to create websites
            and delivery systems that move from inquiry to execution without losing clarity.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((value) => (
              <article key={value.title} className="bg-gray-900 border border-white/[0.06] rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">How We Work</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
                From first conversation to delivery system
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We treat every project as a system — from the first conversation through delivery and support.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: "1", title: "Clarify", desc: "Understand business goals, audience, offer, and constraints." },
                { num: "2", title: "Define", desc: "Map the conversion path and the backend workflows it depends on." },
                { num: "3", title: "Build", desc: "Create the UI, API, and operational logic as one integrated system." },
                { num: "4", title: "Measure", desc: "Track results, fix friction, and scale what works." },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 bg-gray-900 rounded-2xl p-5 border border-white/[0.06]">
                  <span className="text-2xl font-extrabold text-orange-500 leading-none min-w-[2.5rem]">{step.num}</span>
                  <div>
                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
