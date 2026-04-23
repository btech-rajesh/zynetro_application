const { z } = require("zod");

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  company: z.string().trim().max(120, "Company name is too long").optional(),
  serviceId: z.enum([
    "web-dev",
    "backend-dev",
    "ai-automation",
    "crm-portal",
    "mobile-app",
    "saas-platform",
    "consultation"
  ]),
  projectBrief: z.string().trim().min(20, "Project brief must be at least 20 characters"),
  budgetRange: z.enum(["under-50k", "50k-2l", "2l-plus"])
});

module.exports = { leadSchema };
