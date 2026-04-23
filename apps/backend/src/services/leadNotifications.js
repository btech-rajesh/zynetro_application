const nodemailer = require("nodemailer");

function getNotificationStatus() {
  return {
    hasUser: Boolean(process.env.GMAIL_USER),
    hasAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD),
    hasRecipient: Boolean(process.env.LEAD_NOTIFICATION_TO || process.env.GMAIL_USER)
  };
}

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass
    }
  });
}

async function sendLeadNotification(lead) {
  const transporter = getTransport();
  const recipient = process.env.LEAD_NOTIFICATION_TO || process.env.GMAIL_USER;

  if (!transporter || !recipient) {
    return {
      skipped: true,
      reason: "gmail-not-configured",
      status: getNotificationStatus()
    };
  }

  const info = await transporter.sendMail({
    from: `Zynetra Website <${process.env.GMAIL_USER}>`,
    to: recipient,
    replyTo: lead.email,
    subject: `New Zynetra lead from ${lead.name}`,
    text: [
      "A new lead was submitted on the Zynetra website.",
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Service: ${lead.serviceId}`,
      `Budget: ${lead.budgetRange}`,
      `Submitted: ${lead.createdAt.toISOString()}`,
      "",
      "Project brief:",
      lead.projectBrief
    ].join("\n"),
    html: `
      <h2>New Zynetra lead</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Company:</strong> ${lead.company}</p>
      <p><strong>Service:</strong> ${lead.serviceId}</p>
      <p><strong>Budget:</strong> ${lead.budgetRange}</p>
      <p><strong>Submitted:</strong> ${lead.createdAt.toISOString()}</p>
      <p><strong>Project brief:</strong></p>
      <p>${lead.projectBrief}</p>
    `
  });

  return {
    skipped: false,
    recipient,
    messageId: info.messageId
  };
}

module.exports = { getNotificationStatus, sendLeadNotification };