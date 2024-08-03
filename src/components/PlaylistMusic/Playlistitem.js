import React from "react";

const PlaylistItem = ({ song, onClick }) => (
  <div
    className="p-2 border-b border-gray-200 cursor-pointer"
    onClick={() => onClick(song)}
  >
    {song.title}
  </div>
);

export default PlaylistItem;
