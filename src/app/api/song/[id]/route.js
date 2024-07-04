import { connectToDatabase } from "@/service/db";
import songs from "@/service/models/Songs";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const song = await songs.findById(params.id);
    return new Response(JSON.stringify(song), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const song = await songs.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(song), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const updatedSong = await songs.findByIdAndUpdate(
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
