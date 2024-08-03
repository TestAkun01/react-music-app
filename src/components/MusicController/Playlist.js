import React, { useContext } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import RemoveIcon from "@mui/icons-material/Remove";
import { AudioContext } from "./AudioContext";

const Playlist = ({ tracks }) => {
  const { playTrackFromPlaylist, currentTrack, removeTrack, clearPlaylist } =
    useContext(AudioContext);

  const handlePlayTrack = (track) => {
    playTrackFromPlaylist(track);
  };

  const handleRemoveTrack = (trackId) => {
    removeTrack(trackId);
  };

  const handleClearPlaylist = () => {
    clearPlaylist();
  };

  return (
    <div className="bg-gray-800 p-4 sm:w-[400px] h-[400px] w-full rounded-lg flex flex-col">
      <div className="flex justify-between mb-2">
        <p className="text-white text-semibold text-[28px]">Playlist</p>
        <div className="flex space-x-2">
          <button
            onClick={handleClearPlaylist}
            className="text-white px-2 py-1 rounded hover:bg-red-500 transition-colors duration-100"
          >
            Clear <ClearAllIcon />
          </button>
        </div>
      </div>
      <ul className="flex-1 overflow-auto border-b border-t">
        {tracks.map((track) => (
          <li key={track._id} className="py-2">
            <div
              className={`flex justify-between rounded-md items-center p-2 ${
                currentTrack?._id === track._id ? "bg-gray-700" : ""
              }`}
            >
              <button
                onClick={() => handlePlayTrack(track)}
                className={`text-white`}
              >
                {track.title}
              </button>
              <button
                onClick={() => handleRemoveTrack(track._id)}
                className="text-white"
              >
                <RemoveIcon className="hover:bg-red-500 transition-colors duration-100 rounded-[50%]" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
