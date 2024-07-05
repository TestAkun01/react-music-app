import { connectToDatabase } from "@/service/db";
import Song from "@/service/models/Song";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const song = await Song.findById(params.id);
    return new Response(JSON.stringify(song), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const song = await Song.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(song), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      params.id,
      await request.json(),
      {
        new: true,
      }
    );
    return new Response(JSON.stringify(updatedSong), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
