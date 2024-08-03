import { getSession } from "next-auth/react";
import User from "@/service/models/User";
import { connectToDatabase } from "@/service/db";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}
