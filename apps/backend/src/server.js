const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { services } = require("./data/services");
const { leadSchema } = require("./validation/leadSchema");
const { connectDB } = require("./config/db");
const { Lead } = require("./models/Lead");
const { User } = require("./models/User");
const { Appointment } = require("./models/Appointment");
const { getNotificationStatus, sendLeadNotification } = require("./services/leadNotifications");
const { registerUser, loginUser } = require("./services/authService");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const configuredOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (configuredOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok", service: "zynetra-backend", timestamp: new Date().toISOString() });
});

app.post("/api/v1/auth/register", async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const result = await registerUser(name, email, password);
    return res.status(201).json({
      message: "Account created successfully",
      data: { user: result.user, token: result.token }
    });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
});

app.post("/api/v1/auth/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await loginUser(email, password);
    return res.json({
      message: "Login successful",
      data: { user: result.user, token: result.token }
    });
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({ message: error.message });
    }
    return next(error);
  }
});

app.get("/api/v1/services", (_req, res) => {
  res.json({ data: services });
});

app.post("/api/v1/leads", async (req, res, next) => {
  const parsed = leadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  try {
    const lead = await Lead.create({
      ...parsed.data,
      status: "new"
    });

    try {
      const notificationResult = await sendLeadNotification(lead);

      if (notificationResult.skipped) {
        console.warn("Lead saved but Gmail notification skipped", notificationResult);
      } else {
        console.log("Lead notification sent", {
          leadId: String(lead._id),
          recipient: notificationResult.recipient,
          messageId: notificationResult.messageId
        });
      }
    } catch (notificationError) {
      console.error("Lead saved but Gmail notification failed", notificationError);
    }

    return res.status(201).json({
      message: "Lead submitted successfully",
      data: {
        id: lead._id,
        status: lead.status,
        createdAt: lead.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/v1/leads", async (_req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    res.json({ data: leads });
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/appointments", async (req, res, next) => {
  const {
    name,
    email,
    phone,
    company,
    serviceId,
    appointmentDate,
    appointmentTime,
    projectBrief,
    budgetRange
  } = req.body;

  if (!name || !email || !phone || !serviceId || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      company,
      serviceId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      projectBrief,
      budgetRange: budgetRange || "under-50k",
      status: "scheduled"
    });

    return res.status(201).json({
      message: "Appointment scheduled successfully",
      data: {
        id: appointment._id,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        status: appointment.status
      }
    });
  } catch (error) {
    return next(error);
  }
});


app.get("/api/v1/appointments/available-slots", async (req, res, next) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  try {
    const dayStart = new Date(date);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const appointmentsOnDate = await Appointment.find({
      appointmentDate: {
        $gte: dayStart,
        $lt: dayEnd
      },
      status: { $in: ["scheduled", "confirmed"] }
    }).lean();

    const bookedSlots = appointmentsOnDate.map((appointment) => appointment.appointmentTime);
    const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

    res.json({ data: availableSlots });
  } catch (error) {
    next(error);
  }
});
app.use((err, _req, res, _next) => {
  // Keep error payload minimal to avoid leaking internal details.
  console.error("Unhandled error", err);
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  try {
    await connectDB();
    const notificationStatus = getNotificationStatus();

    app.listen(port, () => {
      console.log(`Zynetra backend running on http://localhost:${port}`);

      if (!notificationStatus.hasUser || !notificationStatus.hasAppPassword || !notificationStatus.hasRecipient) {
        console.warn("Gmail notifications are disabled", notificationStatus);
      } else {
        console.log("Gmail notifications are configured", {
          hasUser: notificationStatus.hasUser,
          hasAppPassword: notificationStatus.hasAppPassword,
          hasRecipient: notificationStatus.hasRecipient
        });
      }
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
}

startServer();


