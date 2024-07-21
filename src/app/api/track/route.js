import { connectToDatabase } from "@/service/db";
import Artist from "@/service/models/Artist";
import Like from "@/service/models/Like";
import Track from "@/service/models/Track";
import WatchHistory from "@/service/models/WatchHistory";

export async function GET(request) {
  await connectToDatabase();

  try {
    const url = new URL(request.url);
    const artistQuery = url.searchParams.get("artist");
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    let filter = {};
    if (artistQuery) {
      const artistNames = artistQuery.split(",").map((name) => name.trim());
      const artists = await Artist.find({ artist: { $in: artistNames } });
      const artistIds = artists.map((artist) => artist._id);
      filter = { artist: { $in: artistIds } };
    }
    let query = Track.find(filter).populate("artist");
    if (limit !== -1) {
      query = query.limit(limit);
    }

    const tracks = await query.exec();
    return new Response(JSON.stringify(tracks), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();

    if (body.action === "fetch") {
      const { ids } = body;
      if (!Array.isArray(ids)) {
        return new Response("Invalid data format. Expected an array of IDs.", {
          status: 400,
        });
      }
      const tracks = await Track.find({ _id: { $in: ids } })
        .populate("artist")
        .exec();
      return new Response(JSON.stringify(tracks), { status: 200 });
    }

    if (body.album_id === "") {
      body.album_id = null;
    }
    const newTrack = new Track(body);

    await newTrack.save();

    return new Response(JSON.stringify(newTrack), { status: 201 });
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

    await Like.deleteMany({ trackId: { $in: ids } });
    await WatchHistory.deleteMany({ trackId: { $in: ids } });
    return new Response(JSON.stringify({ deletedCount: result.deletedCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
