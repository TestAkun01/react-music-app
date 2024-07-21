import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Artist from "@/service/models/Artist";
import Category from "@/service/models/Category";
import Track from "@/service/models/Track";

export async function GET(request) {
  const url = new URL(request.url);

  const limit = parseInt(url.searchParams.get("limit")) || 10;
  try {
    await connectToDatabase();

    const randomAlbum = await Album.aggregate([{ $sample: { size: limit } }]);

    const populateAlbum = await Album.populate(randomAlbum, [
      { path: "artist" },
    ]);
    return new Response(JSON.stringify(populateAlbum), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
