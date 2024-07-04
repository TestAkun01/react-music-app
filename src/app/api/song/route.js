import { connectToDatabase } from "@/service/db";
import songs from "@/service/models/Songs";

export async function GET(request) {
  await connectToDatabase();

  const limit = parseInt(new URL(request.url).searchParams.get("limit"));
  const latest = new URL(request.url).searchParams.get("latest");

  try {
    let query = songs.find({});
    if (latest === "1") {
      query = query.sort({ release_date: -1 });
    }
    let song = await query.exec();
    if (limit) {
      song = song.slice(0, limit);
    }
    return new Response(JSON.stringify(song), { status: 200 });
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
    const newSong = new songs({
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
