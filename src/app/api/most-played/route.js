import { connectToDatabase } from "@/service/db";
import WatchHistory from "@/service/models/WatchHistory";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const mostPlayed = await WatchHistory.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: "$trackId", play_count: { $sum: 1 } } },
      { $sort: { play_count: -1 } },
      { $limit: 5 },
    ]);
    return new Response(JSON.stringify(mostPlayed), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
