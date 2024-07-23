import React from "react";
import CardAlbum from "../CardAlbum/CardAlbum";
import Link from "next/link";
export default function AlbumsSection({ albums, artist }) {
  const albumsList = albums
    .filter((album) => album.type === "Album")
    .slice(0, 6);
  const epList = albums.filter((album) => album.type === "EP").slice(0, 6);
  const singlesList = albums
    .filter((album) => album.type === "Single")
    .slice(0, 6);

  const renderAlbums = (title, list) => (
    <>
      {list.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <Link
              href={`/artist/${artist._id}/${title.toLowerCase().slice(0, -1)}`}
              className="hover:text-[#766df4] hover:underline"
            >
              More
            </Link>
          </div>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <CardAlbum data={list} />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div>
      {renderAlbums("Albums", albumsList)}
      {renderAlbums("EPs", epList)}
      {renderAlbums("Singles", singlesList)}
    </div>
  );
}
