import { connectToDatabase } from "@/service/db";
import Songs from "@/service/models/Songs";

export async function GET(request) {
  const query = new URL(request.url).searchParams.get("q");
  console.log(`GET /api/search?q=${query} called`);

  await connectToDatabase();

  try {
    const songs = await Songs.find({});
    const filteredSongs = songs.filter((song) => {
      return song.title.toLowerCase().includes(query.toLowerCase());
    });
    return new Response(JSON.stringify(filteredSongs), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
