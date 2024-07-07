// components/MusicController.js
"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AudioContext } from "./AudioContext";
import Playlist from "./Playlist";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import Image from "next/image";

const MusicController = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
    currentTrack,
    volume,
    setVolume,
    playlist,
    playNext,
    playPrev,
    toggleLoop,
    loopMode,
  } = useContext(AudioContext);
  const seekBarRef = useRef(null);
  const [tempCurrentTime, setTempCurrentTime] = useState(currentTime);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

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

  const handleVolumeChange = (e) => {
    const { value } = e.target;
    setVolume(parseFloat(value));
  };

  const handleVolumeHover = () => {
    setIsVolumeHovered(true);
  };

  const handleVolumeLeave = () => {
    setIsVolumeHovered(false);
  };
  useEffect(() => {
    if (!isSeeking) {
      setTempCurrentTime(currentTime);
    }
  }, [currentTime, isSeeking]);

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };
  return (
    <div className="relative">
      {currentTrack && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 z-10">
          <div className="w-full  m-0 p-0">
            <input
              type="range"
              min="0"
              max={duration}
              value={tempCurrentTime}
              step={"0.01"}
              onChange={handleSeekChange}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              ref={seekBarRef}
              className="h-1 w-full cursor-pointer m-0 p-0 absolute"
            />
          </div>
          <div className="flex items-center justify-between mx-8 py-4">
            <div id="Left_bar" className="flex gap-8 items-center">
              <button onClick={playPrev} className="text-white">
                <SkipPreviousIcon />
              </button>
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? (
                  <PauseIcon sx={{ fontSize: 45 }} />
                ) : (
                  <PlayArrowIcon sx={{ fontSize: 45 }} />
                )}
              </button>
              <button onClick={playNext} className="text-white">
                <SkipNextIcon />
              </button>
              <div className="text-white m-0 p-0 flex items-center">
                <span className="min-w-[57px] text-center">
                  {formatTime(tempCurrentTime)}
                </span>
                /
                <span className="min-w-[57px] text-center">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            <div id="Center_bar" className="flex items-center">
              <span className="text-white font-medium text-[20px]">
                {currentTrack.title}
              </span>
            </div>

            <div id="Right_bar" className=" flex items-center gap-8">
              <div
                className="flex items-center"
                onMouseEnter={handleVolumeHover}
                onMouseLeave={handleVolumeLeave}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={`mx-4 h-1 ${
                    isVolumeHovered ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200`}
                />
                <span className={`text-white cursor-pointer`}>
                  {volume > 0.5 ? (
                    <VolumeUpIcon sx={{ opacity: volume + 0.5 }} />
                  ) : volume > 0 ? (
                    <VolumeDownIcon sx={{ opacity: volume + 0.5 }} />
                  ) : (
                    <VolumeMuteIcon sx={{ opacity: volume + 0.5 }} />
                  )}
                </span>
              </div>
              <div className="cursor-pointer" onClick={toggleLoop}>
                {loopMode === "playlist" ? (
                  <RepeatIcon className="text-white" />
                ) : loopMode === "song" ? (
                  <RepeatOneIcon className="text-white" />
                ) : (
                  <RepeatIcon className="text-gray-500" />
                )}
              </div>
              <div className="cursor-pointer" onClick={togglePlaylist}>
                {isPlaylistOpen ? (
                  <ExpandLessIcon className="text-white" />
                ) : (
                  <ExpandMoreIcon className="text-white" />
                )}
              </div>
            </div>
          </div>
          <div
            className={`absolute z-0 right-5 duration-500 ease-in-out ${
              isPlaylistOpen
                ? "translate-y-0 bottom-[100px]"
                : "translate-y-full bottom-[-1000px]"
            }`}
          >
            <Playlist
              tracks={playlist}
              isOpen={isPlaylistOpen}
              togglePlaylist={togglePlaylist}
            />
          </div>
        </div>
      )}
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

export default MusicController;