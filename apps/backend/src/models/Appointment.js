const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    projectBrief: {
      type: String,
      trim: true,
    },
    budgetRange: {
      type: String,
      enum: ['under-50k', '50k-2l', '2l-plus'],
      default: 'under-50k',
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'cancelled', 'completed'],
      default: 'scheduled',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for quick lookups
appointmentSchema.index({ email: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment };
