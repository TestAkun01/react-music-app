import { connectToDatabase } from "@/service/db";
import WatchHistory from "@/service/models/WatchHistory";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const data = await WatchHistory.aggregate([
      { $match: { userId: userId } },
      { $sort: { watchedAt: -1 } },
      {
        $group: {
          _id: "$trackId",
          watchedAt: { $first: "$watchedAt" },
          userId: { $first: "$userId" },
        },
      },
    ]);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  const { userId, trackId } = await request.json();

  try {
    const watchHistory = new WatchHistory({ userId, trackId });
    await watchHistory.save();
    return new Response(JSON.stringify(watchHistory), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
