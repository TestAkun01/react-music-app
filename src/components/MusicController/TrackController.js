"use client";
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShareIcon from "@mui/icons-material/Share";
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

  const handlePlayTrack = useCallback(() => {
    if (track === currentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  }, [track, currentTrack, togglePlay, playTrack]);

  const handleSeekMouseDown = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const handleSeekChange = useCallback((e) => {
    setTempCurrentTime(e.target.value);
  }, []);

  const handleSeekMouseUp = useCallback(() => {
    setIsSeeking(false);
    seek(tempCurrentTime);
  }, [tempCurrentTime, seek]);

  const handleAddToPlaylist = useCallback(() => {
    addToPlaylist(track);
  }, [track, addToPlaylist]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: track.title,
          text: `Check out this track: ${track.title}`,
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/song/${track.album_id._id}`,
        })
        .catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  }, [track]);

  const isCurrentTrack = currentTrack?._id === track._id;

  return (
    <div
      className={`track-controller p-2 rounded-lg mb-2 ${
        isCurrentTrack ? "bg-gray-700" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-white">{track.title}</span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-white min-w-[57px] text-center">
          {isCurrentTrack ? formatTime(tempCurrentTime) : "00:00"}
        </span>
        <input
          type="range"
          min="0"
          max={isCurrentTrack ? duration : 1}
          step={0.01}
          value={isCurrentTrack ? tempCurrentTime : 0}
          onChange={handleSeekChange}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
          ref={seekBarRef}
          className="w-full mx-2 h-1 cursor-pointer"
          disabled={!isCurrentTrack}
        />
        <span className="text-white min-w-[57px] text-center">
          {isCurrentTrack ? formatTime(duration) : "00:00"}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button onClick={handlePlayTrack} className="text-white">
          {isCurrentTrack && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <button onClick={handleAddToPlaylist} className="text-white ml-2">
          <PlaylistAddIcon />
        </button>
        <button onClick={handleShare} className="text-white ml-2">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default TrackController;
