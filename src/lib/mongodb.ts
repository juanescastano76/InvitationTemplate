import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "userData" });
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB", error);
    throw error;
  }
};
