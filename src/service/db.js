import mongoose from "mongoose";
import Album from "./models/Album";
import Artist from "./models/Artist";
import Category from "./models/Category";
import Like from "./models/Like";
import Track from "./models/Track";
import Type from "./models/Type";
import WatchHistory from "./models/WatchHistory";
import User from "./models/User";

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
