"use client";

import React, { useState } from "react";

import Playlist from "./Playlist";
import Controller from "./Controller";

const PlaylistMusic = () => {
  const [songs] = useState([
    {
      id: 1,
      title: "Supernova",
      artist: "MMJ",
      file_url: "https://www.youtube.com/watch?v=2DGf-KlKXGA",
    },
    {
      id: 2,
      title: "raison",
      artist: "Aria",
      file_url: "https://www.youtube.com/watch?v=Er94KGFrbWg",
    },
  ]);
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <Playlist songs={songs} onSongSelect={setCurrentSong} />
      <Controller currentSong={currentSong} />
    </div>
  );
};

export default PlaylistMusic;
