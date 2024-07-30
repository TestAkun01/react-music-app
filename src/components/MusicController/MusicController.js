"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AudioContext } from "./AudioContext";
import Playlist from "./Playlist";
import LikeButton from "./likeButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
import Link from "next/link";

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
  const { data: session } = useSession();
  const [tempCurrentTime, setTempCurrentTime] = useState(currentTime);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [isVolumeClicked, setIsVolumeClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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

  const handleSeekTouchStart = () => {
    setIsSeeking(true);
  };

  const handleSeekTouchEnd = (e) => {
    setIsSeeking(false);
    seek(tempCurrentTime);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    setVolume(parseFloat(value));
  };

  const handleVolumeClick = () => {
    if (isMobile) {
      setIsVolumeClicked(!isVolumeClicked);
    }
  };

  const handleVolumeHover = () => {
    if (!isMobile) {
      setIsVolumeHovered(true);
    }
  };

  const handleVolumeLeave = () => {
    if (!isMobile) {
      setIsVolumeHovered(false);
    }
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
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 z-10">
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max={duration}
            value={tempCurrentTime}
            step={"0.01"}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onTouchStart={handleSeekTouchStart}
            onTouchEnd={handleSeekTouchEnd}
            ref={seekBarRef}
            className="h-1 w-full cursor-pointer absolute top-0"
            disabled={!currentTrack}
            aria-label="seek-bar"
          />
        </div>
        <div className="grid grid-cols-12 mx-8 py-4 lg:gap-0 gap-y-4">
          <div
            id="Left_bar"
            className="lg:col-span-3 col-span-6 order-1 flex gap-4 lg:gap-8 items-center w-full lg:w-auto"
          >
            <button
              onClick={playPrev}
              className="text-white"
              disabled={!currentTrack}
              aria-label="prev-button"
            >
              <SkipPreviousIcon />
            </button>
            <button
              onClick={togglePlay}
              className="text-white"
              aria-label="play-pause-button"
            >
              {currentTrack ? (
                isPlaying ? (
                  <PauseIcon sx={{ fontSize: 45 }} />
                ) : (
                  <PlayArrowIcon sx={{ fontSize: 45 }} />
                )
              ) : (
                <PlayArrowIcon sx={{ fontSize: 45 }} />
              )}
            </button>
            <button
              onClick={playNext}
              className="text-white"
              disabled={!currentTrack}
              aria-label="next-button"
            >
              <SkipNextIcon />
            </button>
            <div className="text-white m-0 p-0 flex items-center lg:block hidden">
              <span className="min-w-[57px] text-center">
                {formatTime(tempCurrentTime)}
              </span>
              /
              <span className="min-w-[57px] text-center">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div
            id="Center_bar"
            className="lg:col-span-6 col-span-full lg:order-2 order-3"
          >
            {currentTrack ? (
              <div className="flex items-center gap-4 max-w-full justify-center">
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  width={300}
                  height={300}
                  className="h-[45px] w-auto"
                ></Image>

                <div className="flex flex-col max-w-full overflow-hidden">
                  <div className="text-gray-200 text-base truncate w-full text-left">
                    {currentTrack.title}
                  </div>
                  <div className="text-gray-400 text-base truncate w-full text-left">
                    {currentTrack.artist.map((artist, index) => (
                      <span key={artist._id}>
                        <Link
                          href={`/artist/${artist._id}`}
                          className="hover:underline"
                        >
                          {artist.artist}
                        </Link>
                        {index < currentTrack.artist.length - 1 && " & "}
                      </span>
                    ))}
                    <span className="text-white"> &#8226; </span>
                    <Link
                      href={`/song/${currentTrack.album_id._id}`}
                      className="hover:underline"
                    >
                      {currentTrack.album_id.title}
                    </Link>
                  </div>
                </div>
                {session ? (
                  <LikeButton
                    userId={session.user.email}
                    trackId={currentTrack._id}
                  ></LikeButton>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-base">
                  No track is currently playing
                </p>
              </div>
            )}
          </div>

          <div
            id="Right_bar"
            className="lg:col-span-3 col-span-6 lg:order-3 order-2 flex items-center gap-4 justify-end"
          >
            <div className="flex items-center justify-end h-full ">
              <div
                className={`text-white cursor-pointer relative`}
                onClick={handleVolumeClick}
                onMouseEnter={handleVolumeHover}
                onMouseLeave={handleVolumeLeave}
              >
                {volume > 0.5 ? (
                  <VolumeUpIcon sx={{ opacity: volume + 0.5 }} />
                ) : volume > 0 ? (
                  <VolumeDownIcon sx={{ opacity: volume + 0.5 }} />
                ) : (
                  <VolumeMuteIcon sx={{ opacity: volume + 0.5 }} />
                )}
                <div
                  className={`absolute py-4 px-4 bg-gray-800 border rounded ${
                    isVolumeHovered || isVolumeClicked
                      ? "opacity-100 block"
                      : "opacity-0 hidden"
                  } transition-opacity duration-200 flex items-center`}
                  onMouseEnter={handleVolumeHover}
                  onMouseLeave={handleVolumeLeave}
                  style={{
                    bottom: "350%",
                    left: "50%",
                    transform: "translateX(-50%) rotate(270deg)",
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    className="h-1"
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="volume-bar"
                  />
                </div>
              </div>
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
          className={`absolute -z-10 sm:w-max sm:h-auto w-full sm:right-5 right-0 duration-500 ease-in-out ${
            isPlaylistOpen
              ? "translate-y-[-100%] top-0 sm:-top-5"
              : "translate-y-full"
          }`}
        >
          <Playlist
            tracks={playlist}
            isOpen={isPlaylistOpen}
            togglePlaylist={togglePlaylist}
          />
        </div>
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

export default MusicController;
