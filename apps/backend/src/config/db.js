const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set. Add it in apps/backend/.env");
  }

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  return mongoose.connection;
}

module.exports = { connectDB };
