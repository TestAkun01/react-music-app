import React from "react";
import Image from "next/image";

const SongCard = ({ track }) => {
  if (!track) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded shadow">
        <p>Loading track details...</p>
      </div>
    );
  }
  return (
    <div className="text-white rounded shadow flex items-center gap-4">
      <Image
        src={track.cover}
        alt={track.title}
        className="w-auto h-12 object-cover"
        width={300}
        height={300}
      />
      <div className="flex flex-col justify-center">
        <p>{track.title}</p>
        <p className="text-gray-400">
          {track.artist.map((data) => data.artist).join(" & ")}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
