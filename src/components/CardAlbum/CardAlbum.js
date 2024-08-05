import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

export default function CardAlbum({ data }) {
  return (
    <>
      {data.length > 0 ? (
        data.map((album) => (
          <Link
            key={album._id}
            href={`/song/${album._id}`}
            className="rounded max-w-[200px] w-full mx-auto hover:shadow-md hover:shadow-[#766df4] transition-all duration-300"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={album.cover}
                alt={`Image ${album.title}`}
                layout="fill"
                objectFit="cover"
                priority="true"
              />
            </div>
            <div className="p-2 pb-4">
              <h3 className="text-sm font-semibold line-clamp-2">
                {album.title}
              </h3>
              <p className="text-sm font-light text-gray-400">
                {album.type} &#8226; {album.release_date.split("-")[0]}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-white text-center mt-10 col-span-full">
          No albums found.
        </div>
      )}
    </>
  );
}
