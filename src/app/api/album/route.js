import { connectToDatabase } from "@/service/db";
import Album from "@/service/models/Album";
import Artist from "@/service/models/Artist";
import Category from "@/service/models/Category";
import Track from "@/service/models/Track";

export async function GET(request) {
  await connectToDatabase();

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const page = parseInt(url.searchParams.get("page")) || 1;
  const categories = url.searchParams.get("category") || "";
  const artistName = url.searchParams.get("artist") || "";
  const type = url.searchParams.get("type") || "";

  try {
    let query = Album.find({});

    query = query.sort({ release_date: -1 });

    if (categories && categories !== "All") {
      const category = await Category.findOne({ category: categories });
      if (!category) {
        return new Response("Category not found", { status: 404 });
      }
      query = query.where("category").in(category._id);
    }

    if (artistName) {
      const artist = await Artist.findOne({ artist: artistName });
      if (!artist) {
        return new Response("Artist not found", { status: 404 });
      }
      query = query.where("artist").in(artist._id);
    }

    if (type) {
      query = query.where("type").equals(type);
    }

    const skip = (page - 1) * limit;
    const totalAlbums = await Album.countDocuments(query);

    if (limit !== -1) {
      query = query.skip(skip).limit(limit);
    } else {
      query = query.skip(skip);
    }

    const albums = await query
      .populate("track")
      .populate("artist")
      .populate("category")
      .exec();

    const totalPages = Math.ceil(totalAlbums / limit);

    const pagination = {
      currentPage: page,
      totalPages: Math.abs(totalPages),
      totalItems: totalAlbums,
    };

    return new Response(JSON.stringify({ pagination, data: albums }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const body = await request.json();

    const { track: trackIds, cover: albumCover } = body;

    const newAlbum = new Album(body);
    await newAlbum.save();
    const albumId = newAlbum._id;

    if (Array.isArray(trackIds) && trackIds.length > 0) {
      await Track.updateMany(
        { _id: { $in: trackIds } },
        { $set: { cover: albumCover, album_id: albumId } }
      );
    }

    return new Response(JSON.stringify(newAlbum), { status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
