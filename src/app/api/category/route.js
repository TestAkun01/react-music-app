import { connectToDatabase } from "@/service/db";
import category from "@/service/models/category";

export async function GET(request) {
  await connectToDatabase();

  try {
    const data = await category.find({});
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
