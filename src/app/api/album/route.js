import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Track from "@/service/models/Track";

export async function GET(request) {
  await connectToDatabase();

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const page = parseInt(url.searchParams.get("page")) || 1;
  const latest = url.searchParams.get("latest") === "1";
  const categories = url.searchParams.get("category") || "";

  try {
    let query = Album.find({});

    if (latest) {
      query = query.sort({ release_date: -1 });
    }

    if (categories && !categories.includes("All")) {
      query = query.where("category").equals(categories);
    }

    const skip = (page - 1) * limit;
    const totalAlbums = await Album.countDocuments(query);

    if (limit !== -1) {
      query = query.skip(skip).limit(limit);
    } else {
      query = query.skip(skip);
    }

    const albums = await query.populate("list").exec();

    const totalPages = Math.ceil(totalAlbums / limit);

    const pagination = {
      currentPage: page,
      totalPages: Math.abs(totalPages),
      totalItems: totalAlbums,
    };

    return new Response(JSON.stringify({ pagination, data: albums }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  const { title, artist, release_date, category, cover, list } =
    await request.json();

  try {
    const newAlbum = new Album({
      title,
      artist,
      release_date,
      category,
      cover,
      list: [],
    });

    const savedAlbum = await newAlbum.save();

    const trackPromises = list.map(async (trackData) => {
      const newTrack = new Track({
        ...trackData,
        cover: savedAlbum.cover,
        artist: savedAlbum.artist,
        album_id: savedAlbum._id,
      });
      const savedTrack = await newTrack.save();
      savedAlbum.list.push(savedTrack._id);
      return savedTrack;
    });

    await Promise.all(trackPromises);
    await savedAlbum.save();

    return new Response(JSON.stringify(savedAlbum), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
