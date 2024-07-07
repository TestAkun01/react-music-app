"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { AudioContext } from "./AudioContext";

const TrackController = ({ track }) => {
  const {
    playTrack,
    isPlaying,
    togglePlay,
    currentTrack,
    currentTime,
    duration,
    seek,
    addToPlaylist,
  } = useContext(AudioContext);
  const seekBarRef = useRef(null);
  const [tempCurrentTime, setTempCurrentTime] = useState(currentTime);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setTempCurrentTime(currentTime);
    }
  }, [currentTime, isSeeking]);

  const handlePlayTrack = () => {
    if (track === currentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (e) => {
    const { value } = e.target;
    setTempCurrentTime(value);
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false);
    seek(tempCurrentTime);
  };

  const handleAddToPlaylist = () => {
    addToPlaylist(track);
  };

  return (
    <div className="track-controller bg-gray-700 p-2 rounded-lg mb-2">
      <div className="flex items-center justify-between">
        <span className="text-white">{track.title}</span>
      </div>
      {currentTrack?._id === track._id && (
        <div className="flex items-center mt-2">
          <span className="text-white min-w-[57px] text-center">
            {formatTime(tempCurrentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={tempCurrentTime}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            ref={seekBarRef}
            className="w-full mx-2"
          />
          <span className="text-white min-w-[57px] text-center">
            {formatTime(duration)}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button onClick={handlePlayTrack} className="text-white">
          {currentTrack?._id === track._id && isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </button>
        <button onClick={handleAddToPlaylist} className="text-white ml-2">
          <PlaylistAddIcon />
        </button>
      </div>
    </div>
  );
};

// Function to format time in MM:SS format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default TrackController;
