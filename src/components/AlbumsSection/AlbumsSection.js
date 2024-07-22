import React from "react";
import Image from "next/image";

export default function AlbumsSection({ albums }) {
  const albumsList = albums.filter((album) => album.type === "Album");
  const epList = albums.filter((album) => album.type === "EP");
  const singlesList = albums.filter((album) => album.type === "Single");

  const renderAlbums = (title, list) => (
    <>
      {list.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <div className="flex gap-4">
            {list.map((album) => (
              <div
                key={album._id}
                className="rounded-lg shadow-md max-w-[150px]"
              >
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={800}
                  height={800}
                  className="rounded-sm"
                />
                <h3 className="text-sm font-semibold mt-4 line-clamp-2">
                  {album.title}
                </h3>
                <p className="text-sm font-light text-gray-400">
                  {album.type} &#8226; {album.release_date.split("-")[0]}
                </p>
              </div>
            ))}
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
