import { connectToDatabase } from "@/service/db";
import Artist from "@/service/models/Artist";
import Track from "@/service/models/Track";

export async function GET(request) {
  await connectToDatabase();

  try {
    const tracks = await Track.find({}).populate("artist").exec();
    return new Response(JSON.stringify(tracks), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids)) {
      return new Response("Invalid data format. Expected an array of IDs.", {
        status: 400,
      });
    }
    const tracks = await Track.find({ _id: { $in: ids } }).populate("artist");
    return new Response(JSON.stringify(tracks), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { ids } = await request.json();
    if (!Array.isArray(ids)) {
      return new Response("Invalid data format. Expected an array of IDs.", {
        status: 400,
      });
    }
    const result = await Track.deleteMany({ _id: { $in: ids } });
    return new Response(JSON.stringify({ deletedCount: result.deletedCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
