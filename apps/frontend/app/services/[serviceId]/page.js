import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import AppointmentBooking from "@/components/AppointmentBooking";
import { fetchServices } from "@/lib/api";

export default async function ServiceDetailPage({ params }) {
  let services = [];

  try {
    services = await fetchServices();
  } catch {
    services = [];
  }

  const service = services.find((item) => item.id === params.serviceId);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-950 text-white">
        <section className="relative overflow-hidden border-b border-white/[0.08] bg-gray-950 py-16 lg:py-24">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />
          <div className="max-w-6xl mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <div className="mb-4 text-5xl">{service.icon || "•"}</div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                Service Consultation
              </p>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-300">
                {service.summary}
              </p>
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6">
                <h2 className="mb-4 text-lg font-semibold">What this consultation covers</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="mt-1 text-orange-400">●</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-gray-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                  Schedule Consultation
                </p>
                <h2 className="mt-2 text-2xl font-bold">Book a free 15-minute call</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Pick an available date and time in the interface below, then submit your project brief.
                </p>
              </div>
              <AppointmentBooking initialServiceId={service.id} />
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Structured Discovery",
                  body: "We use the booking brief to enter the call with context instead of starting from scratch."
                },
                {
                  title: "Practical Scope",
                  body: "The session is focused on delivery shape, tradeoffs, timeline, and the next production-safe step."
                },
                {
                  title: "Clear Follow-Up",
                  body: "After the call, you have a concrete action path, whether that is a proposal, sprint, or architecture plan."
                }
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6"
                >
                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
