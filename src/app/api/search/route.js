import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";

export async function GET(request) {
  const url = new URL(request.url);
  const query = decodeURIComponent(url.searchParams.get("q"));
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const page = parseInt(url.searchParams.get("page")) || 1;

  await connectToDatabase();

  try {
    let dbQuery = {};

    if (query) {
      dbQuery = { title: { $regex: new RegExp(query, "i") } };
    }

    const totalSongs = await Album.countDocuments(dbQuery);
    const totalPages = Math.ceil(totalSongs / limit);
    const skip = (page - 1) * limit;

    const songs = await Album.find(dbQuery)
      .sort({ release_date: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")
      .exec();

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
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
