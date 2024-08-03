import { connectToDatabase } from "@/service/db";
import Artist from "@/service/models/Artist";

export async function GET(request) {
  await connectToDatabase();

  try {
    const data = await Artist.find({});
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const newArtist = new Artist(body);
    console.log(body);
    await newArtist.save();

    return new Response(JSON.stringify(newArtist), { status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
