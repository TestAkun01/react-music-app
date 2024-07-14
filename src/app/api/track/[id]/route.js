import { connectToDatabase } from "@/service/db";
import Track from "@/service/models/Track";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const response = await Track.findById(params.id);
    if (!response) {
      return new Response("Track not found", { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const response = await Track.findByIdAndDelete(params.id);
    if (!response) {
      return new Response("Track not found", { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
