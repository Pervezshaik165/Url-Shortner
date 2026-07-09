import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/url-shortner`)
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;