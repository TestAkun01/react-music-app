import { connectToDatabase } from "@/service/db";
import Like from "@/service/models/Like";
import Track from "@/service/models/Track";
import WatchHistory from "@/service/models/WatchHistory";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const response = await Track.findById(params.id)
      .populate("artist")
      .populate("album_id");
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
    await Like.deleteMany({ trackId: params.id });
    await WatchHistory.deleteMany({ trackId: params.id });
    if (!response) {
      return new Response("Track not found", { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const { id } = params;
    const body = await request.json();

    const updatedTrack = await Track.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTrack) {
      return new Response("Track not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedTrack), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
