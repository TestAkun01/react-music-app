import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LongCardList({ data }) {
  return (
    <div className="space-y-4">
      {data.map((track, i) => (
        <div key={track._id}>
          <div className="transition-all duration-300 hover:bg-gray-900 hover:shadow-md hover:shadow-[#766df4] rounded py-2 px-4">
            <Link href={`/song/${track.album_id._id}`}>
              <div className="grid grid-cols-5 items-center gap-4">
                <div className="block">
                  <Image
                    src={track.cover}
                    alt={`Image ${track.title}`}
                    width={100}
                    height={100}
                    className="h-[60px] w-auto"
                  />
                </div>
                <p className="text-sm font-medium text-gray-300">
                  {track.artist.map((data) => data.artist).join(" & ")}
                </p>
                <p className="text-sm font-medium text-gray-300 line-clamp-2">
                  {track.title}
                </p>
                <p className="text-sm font-medium text-gray-300 line-clamp-2">
                  {track.album_id.title}
                </p>
                <p className="text-sm text-gray-400 justify-self-end line-clamp-2">
                  {track.duration ? track.duration : ". . . ."}
                </p>
              </div>
            </Link>
          </div>
          {i < data.length - 1 && <hr className="border-gray-800 my-2" />}
        </div>
      ))}
    </div>
  );
}
