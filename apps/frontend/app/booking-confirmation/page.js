function formatLeadId(leadId) {
  if (!leadId) {
    return "Pending assignment";
  }

  return leadId;
}

export default function BookingConfirmationPage({ searchParams }) {
  const leadId = formatLeadId(searchParams?.leadId);

  return (
    <main className="page-shell narrow-shell">
      <section className="section-card confirmation-card">
        <p className="eyebrow">Consultation Confirmed</p>
        <h1>Thanks. Your project request has been received.</h1>
        <p>
          Our team will review your inquiry, map the right service path, and contact you with the next
          steps for consultation and delivery planning.
        </p>

        <div className="confirmation-meta">
          <div>
            <span className="pill">Lead Reference</span>
            <h3>{leadId}</h3>
          </div>
          <div>
            <span className="pill">Next Step</span>
            <h3>Review and response within one business day</h3>
          </div>
        </div>

        <div className="cta-actions">
          <a className="primary-link" href="/">
            Back to Homepage
          </a>
          <a className="secondary-link" href="/contact">
            Contact Zynetra
          </a>
        </div>
      </section>
    </main>
  );
}