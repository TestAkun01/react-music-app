import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Category from "@/service/models/Category";
import Track from "@/service/models/Track";
export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const album = await Album.findById(params.id)
      .populate({
        path: "track",
        populate: [
          { path: "album_id", model: "Album" },
          { path: "artist", model: "Artist" },
        ],
      })
      .populate("artist")
      .populate("category");
    if (!album) {
      return new Response("Album not found", { status: 404 });
    }
    return new Response(JSON.stringify(album), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const album = await Album.findByIdAndDelete(params.id);
    if (!album) {
      return new Response("Album not found", { status: 404 });
    }
    return new Response(JSON.stringify(album), { status: 200 });
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
    const { track: trackIds, cover: albumCover } = body;

    const updatedAlbum = await Album.findByIdAndUpdate(id, body, { new: true });

    if (!updatedAlbum) {
      return new Response("Album not found", { status: 404 });
    }

    if (Array.isArray(trackIds) && trackIds.length > 0) {
      await Track.updateMany(
        { _id: { $in: trackIds } },
        { $set: { cover: albumCover, album_id: id } }
      );
    }

    return new Response(JSON.stringify(updatedAlbum), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
