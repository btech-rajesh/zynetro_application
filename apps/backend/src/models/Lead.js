const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    serviceId: {
      type: String,
      required: true,
      enum: ["web-dev", "backend-dev", "ai-automation", "crm-portal", "mobile-app", "saas-platform", "consultation"]
    },
    projectBrief: { type: String, required: true, trim: true },
    budgetRange: {
      type: String,
      required: true,
      enum: ["under-50k", "50k-2l", "2l-plus"]
    },
    status: {
      type: String,
      required: true,
      default: "new",
      enum: ["new", "contacted", "qualified", "won", "lost"]
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

module.exports = { Lead };
