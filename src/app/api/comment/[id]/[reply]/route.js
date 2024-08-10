import { connectToDatabase } from "@/service/db";
import Comment from "@/service/models/Comment";

export async function POST(request, { params }) {
  await connectToDatabase();

  try {
    const { id } = params;
    const body = await request.json();

    const reply = {
      userId: body.userId,
      text: body.text,
      createdAt: new Date(),
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $push: { replies: reply } },
      { new: true }
    );

    if (!updatedComment) {
      return new Response("Comment not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedComment), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
