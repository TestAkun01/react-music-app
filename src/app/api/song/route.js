import { connectToDatabase } from "@/service/db";
import Song from "@/service/models/Song";

export async function GET(request) {
  await connectToDatabase();

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const page = parseInt(url.searchParams.get("page")) || 1;
  const latest = url.searchParams.get("latest") === "1";
  const categories = url.searchParams.get("category") || "";

  try {
    let query = Song.find({});

    if (latest) {
      query = query.sort({ release_date: -1 });
    }

    if (categories && !categories.includes("All")) {
      query = query.where("category").equals(categories);
    }

    const skip = (page - 1) * limit;
    const totalSongs = await Song.countDocuments(query);

    if (limit !== -1) {
      query = query.skip(skip).limit(limit);
    } else {
      query = query.skip(skip);
    }

    const songs = await query.exec();

    const totalPages = Math.ceil(totalSongs / limit);

    const pagination = {
      currentPage: page,
      totalPages: Math.abs(totalPages),
      totalItems: totalSongs,
    };

    return new Response(JSON.stringify({ pagination, data: songs }), {
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
    const newSong = new Song({
      title,
      artist,
      release_date,
      category,
      cover,
      list,
    });
    const savedSong = await newSong.save();
    return new Response(JSON.stringify(savedSong), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
