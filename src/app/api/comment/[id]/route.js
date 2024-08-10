import { connectToDatabase } from "@/service/db";
import Comment from "@/service/models/Comment";

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const comment = await Comment.findByIdAndDelete(params.id);

    if (!comment) {
      return new Response("Comment not found", { status: 404 });
    }
    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const { id } = params;
    const body = await request.json();

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text: body.text },
      {
        new: true,
      }
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
