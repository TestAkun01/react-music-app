"use client";

import React, { useState } from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = ({ songs, onSongSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-800 text-white p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 bg-blue-500 p-2 rounded"
      >
        {isOpen ? "Close Playlist" : "Open Playlist"}
      </button>
      {isOpen && (
        <div>
          {songs.map((song) => (
            <PlaylistItem key={song.id} song={song} onClick={onSongSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
