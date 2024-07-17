import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Track from "@/service/models/Track";

export async function GET(request, { params }) {
  await connectToDatabase();

  try {
    const album = await Album.findById(params.id)
      .populate("list")
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
    await Track.deleteMany({ album_id: album._id });
    return new Response(JSON.stringify(album), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const updatedData = await request.json();

    if (updatedData.list) {
      const trackPromises = updatedData.list.map(async (trackData) => {
        let track;
        const trackUpdateData = {
          ...trackData,
          cover: updatedData.cover,
          artist: updatedData.artist,
          album_id: updatedData._id,
        };

        if (trackData._id) {
          track = await Track.findByIdAndUpdate(
            trackData._id,
            trackUpdateData,
            {
              new: true,
            }
          );
        } else {
          track = new Track(trackUpdateData);
          track = await track.save();
        }

        return track._id;
      });

      const trackIds = await Promise.all(trackPromises);
      updatedData.list = trackIds;
    }
    let updatedAlbum = await Album.findByIdAndUpdate(params.id, updatedData, {
      new: true,
    });

    updatedAlbum = await Album.findById(params.id).populate("list");

    return new Response(JSON.stringify(updatedAlbum), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
