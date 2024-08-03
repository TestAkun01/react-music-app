import { connectToDatabase } from "@/service/db";
import Type from "@/service/models/Type";

export async function GET(request) {
  await connectToDatabase();

  try {
    const data = await Type.find({});
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
