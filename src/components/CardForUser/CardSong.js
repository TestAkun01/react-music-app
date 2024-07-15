// CardSong.js
import React from "react";
import Image from "next/image";

const SongCard = ({ song, date, totalPlay }) => {
  if (!song) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p>Loading song details...</p>
      </div>
    );
  }

  return (
    <div className="text-white rounded shadow flex items-center gap-4">
      <Image
        src={song.cover}
        alt={song.title}
        className="w-auto h-12 object-cover"
        width={300}
        height={300}
      />
      <div className="flex flex-col justify-center">
        <p>{song.title}</p>
        <p className="text-gray-400">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
