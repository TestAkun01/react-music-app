import { connectToDatabase } from "@/service/db";
import Artist from "@/service/models/Artist";
import Album from "@/service/models/Album";
import Track from "@/service/models/Track";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const artist = await Artist.findById(params.id);

    if (!artist) {
      return new Response("Artist not found", { status: 404 });
    }
    return new Response(JSON.stringify(artist), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const artist = await Artist.findByIdAndDelete(params.id);

    if (!artist) {
      return new Response("Artist not found", { status: 404 });
    }
    return new Response(JSON.stringify(artist), { status: 200 });
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

    const updatedArtist = await Artist.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedArtist) {
      return new Response("Artist not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedArtist), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
