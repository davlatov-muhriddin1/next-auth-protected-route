import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
