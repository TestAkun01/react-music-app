// src/utils/db.js
import mongoose from "mongoose";

const uri = `${process.env.NEXT_PUBLIC_CONNECTION_STRING}`;
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
