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
    <div className="bg-gray-800 text-white p-4 rounded shadow">
      <Image
        src={song.cover}
        alt={song.title}
        className="w-full h-auto object-cover rounded mb-2"
        width={300}
        height={300}
      />
      <p>Title : {song.title}</p>
      <p>Artist : {song.artist}</p>
      {date && <p>Date: {new Date(date).toLocaleString().split(",")[0]}</p>}
      {totalPlay && <p>Total Plays: {totalPlay}</p>}
    </div>
  );
};

export default SongCard;
