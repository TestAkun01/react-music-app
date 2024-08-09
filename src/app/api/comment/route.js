import { connectToDatabase } from "@/service/db";
import Comment from "@/service/models/Comment";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get("albumId");
  const userId = searchParams.get("userId");

  try {
    const query = {};
    if (albumId) {
      query.albumId = albumId;
    }
    if (userId) {
      query.userId = userId;
    }

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .populate("userId");
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  const { albumId, userId, text } = await request.json();

  try {
    const comment = new Comment({ albumId, userId, text });
    await comment.save();
    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
