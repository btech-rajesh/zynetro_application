import { fetchServices } from "../lib/api";
import Image from "next/image";

const trustStats = [
  { label: "Businesses supported", value: "80+" },
  { label: "Delivery workflows", value: "100+" },
  { label: "Build style", value: "Production-first" },
];

const approachSteps = [
  { num: "01", title: "Discover", body: "Study your audience, offer, and current conversion gaps deeply." },
  { num: "02", title: "Shape", body: "Craft messaging, structure, and service proof around real outcomes." },
  { num: "03", title: "Build", body: "Develop frontend and backend together with lead capture at the core." },
  { num: "04", title: "Grow", body: "Launch, measure, and iterate on funnel performance continuously." },
];

const techStack = [
  { label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "MongoDB"] },
  { label: "AI & Automation", items: ["OpenAI", "LangChain", "n8n"] },
];

const aiCapabilities = [
  {
    icon: "🤖",
    title: "AI-Powered Chatbots",
    body: "Context-aware support and lead qualification for customer-facing business workflows.",
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    body: "Automations that remove manual steps across intake, delivery, and support operations.",
  },
  {
    icon: "📊",
    title: "Decision Intelligence",
    body: "Insight layers that help teams act faster on leads, delivery velocity, and growth metrics.",
  },
];

const contactMethods = [
  { icon: "📧", label: "Email", value: "krajeshpachori@gmail.com" },
  { icon: "📞", label: "Phone", value: "+91 8630394151" },
  { icon: "📍", label: "Location", value: "India" },
];

export default async function HomePage() {
  let services = [];
  let hasServiceError = false;

  try {
    services = await fetchServices();
  } catch {
    hasServiceError = true;
  }

  return (
    <main className="font-sans antialiased">

      {/* ═══════════════ HERO */}
      <section className="relative bg-gray-950 pt-28 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/4 w-[480px] h-[480px] bg-orange-600/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-900/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full uppercase mb-5">
                Web Development & AI Automation Agency
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-tight mb-6">
                Build Digital Solutions That{" "}
                <span className="text-orange-500">Transform Revenue</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                Zynetra builds premium service funnels, scalable backend systems, and AI automation
                that help businesses move from scattered execution to predictable digital growth.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <a href="/booking-slots" className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-900/30">
                  Book a Free Consultation
                </a>
                <a href="#services" className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white rounded-xl transition-colors font-medium">
                  Explore Services
                </a>
              </div>
              <div className="flex flex-wrap gap-8">
                {trustStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="rounded-3xl border border-white/[0.08] bg-gray-900/80 p-8 shadow-2xl shadow-black/30 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4">
                  Book Your Slot
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">Schedule a Free Call</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Get a personalized consultation with our team. 15 minutes to discuss your project and next steps.
                </p>
                <a href="/booking-slots" className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-900/30">
                  Open Calendar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO WE ARE */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5">
                Technology, conversion strategy, and execution in one delivery partner
              </h2>
              <p className="text-gray-500 leading-relaxed">
                We combine frontend UX, backend architecture, and AI automation to design service
                businesses that look sharp, convert better, and operate with less friction.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Innovation", body: "We build with modern stacks and process automation rather than brochure-style delivery." },
                { title: "Quality", body: "Architecture, UX, and API design are planned as production assets from day one." },
                { title: "Reliability", body: "Critical lead and delivery flows are measurable, testable, and maintainable." },
                { title: "Client Focus", body: "We work closely with clients to deliver results that exceed expectations every time." },
              ].map((item) => (
                <article key={item.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES */}
      <section className="bg-gray-50 py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              End-to-end delivery from discovery and design to backend operations and AI implementation.
            </p>
          </div>
          {hasServiceError && (
            <p className="text-center text-red-500 mb-8 text-sm">Unable to load services right now.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <article key={service.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-4 self-start">
                  Core Service
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.summary}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ APPROACH */}
      <section className="bg-white py-20" id="approach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Our Approach</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5">
                What we do is very simple
              </h2>
              <p className="text-gray-500 leading-relaxed">
                The funnel follows a proven service-agency pattern: strong first impression, service
                clarity, qualification, consultation capture, and backend-supported project intake.
              </p>
            </div>
            <div className="space-y-4">
              {approachSteps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                  <span className="text-2xl font-extrabold text-orange-500 leading-none min-w-[2.5rem]">{step.num}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TECH STACK */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest text-gray-500 uppercase mb-10">Our Tech Stack</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {techStack.map((stack) => (
              <div key={stack.label} className="bg-gray-900 rounded-2xl p-6 border border-white/[0.06] text-center">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">{stack.label}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {stack.items.map((item) => (
                    <span key={item} className="px-3 py-1 text-sm font-medium text-orange-400 bg-orange-400/10 rounded-full border border-orange-400/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ AI SECTION */}
      <section className="bg-gray-50 py-20" id="ai">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">AI Solutions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">The Future We Build</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We use AI to support growth, automate repetitive work, and improve lead handling quality.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {aiCapabilities.map((item) => (
              <article key={item.title} className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FOUNDER */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Meet The Founder</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5">
                Hello, I&apos;m Rajesh Pachauri, the founder of Zynetra
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                I specialize in full-stack web development and AI automation. I built Zynetra to
                help businesses get not just a pretty site, but a real digital system — one that
                attracts, qualifies, and converts the right clients consistently.
              </p>
              <blockquote className="border-l-4 border-orange-500 pl-5 py-1 mb-5">
                <p className="text-gray-700 italic leading-relaxed">
                  &ldquo;The goal is not just to launch pages. The goal is to design a business flow
                  that can attract, qualify, and convert the right clients consistently.&rdquo;
                </p>
              </blockquote>
              <p className="font-bold text-gray-900">Rajesh Pachauri</p>
              <p className="text-sm text-orange-600 font-medium">Founder &amp; Full-Stack Developer, Zynetra</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-emerald-800/10 rounded-3xl blur-2xl scale-110" />
                <Image
                  src="/rajesh-pachauri.jpg"
                  alt="Rajesh Pachauri — Founder & Developer at Zynetra"
                  width={320}
                  height={380}
                  className="relative rounded-3xl object-cover object-top shadow-2xl border border-gray-100"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange-200 text-xs font-semibold tracking-widest uppercase mb-3">Limited Time Offer</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Free 15-minute consultation for your digital growth roadmap
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8">
            Book a consultation now and get a free website audit. Use the form to discuss website
            rebuilds, backend systems, AI workflows, or full service-platform planning.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#consultation-form" className="px-7 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors shadow-md">
              Book Now — It&apos;s Free
            </a>
            <a href="#contact" className="px-7 py-3 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT */}
      <section className="bg-gray-950 py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Use the form, call directly, or reach out through our contact channels.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {contactMethods.map((item) => (
              <article key={item.label} className="bg-gray-900 rounded-2xl border border-white/[0.06] p-6 text-center hover:border-orange-500/30 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">{item.label}</p>
                <p className="text-white font-semibold">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
