import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Track from "@/service/models/Track";
import Artist from "@/service/models/Artist";

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const { type } = params;

  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const artistName = url.searchParams.get("artist") || "";

  try {
    await connectToDatabase();

    let query = {};
    if (artistName) {
      const artist = await Artist.findOne({ artist: artistName });
      if (!artist) {
        return new Response("Artist not found", { status: 404 });
      }
      query.artist = artist._id;
    }

    let randomItems;
    let populateItems;

    if (type === "album") {
      randomItems = await Album.aggregate([
        { $match: query },
        { $sample: { size: limit } },
      ]);

      populateItems = await Album.populate(randomItems, [{ path: "artist" }]);
    } else if (type === "track") {
      randomItems = await Track.aggregate([
        { $match: query },
        { $sample: { size: limit } },
      ]);
      populateItems = await Track.populate(randomItems, [
        { path: "artist" },
        { path: "album_id" },
      ]);
    } else if (type === "artist") {
      randomItems = await Artist.aggregate([
        { $match: query },
        { $sample: { size: limit } },
      ]);
      populateItems = randomItems;
    } else {
      return new Response("Invalid type parameter", { status: 400 });
    }

    return new Response(JSON.stringify(populateItems), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
