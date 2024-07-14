import { connectToDatabase } from "@/service/db";
import Like from "@/service/models/Like";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const trackId = searchParams.get("trackId");

  try {
    const likes = await Like.find({ userId: userId, trackId: trackId });
    return new Response(JSON.stringify(likes), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  const { userId, trackId } = await request.json();

  try {
    const like = new Like({ userId, trackId });
    await like.save();
    return new Response(JSON.stringify(like), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(request) {
  await connectToDatabase();
  const { userId, trackId } = await request.json();

  try {
    await Like.deleteOne({ userId, trackId });
    return new Response("Like removed", { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
