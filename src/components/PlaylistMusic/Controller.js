"use client";

import React, { useState, useEffect, useRef } from "react";

const Controller = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMouseDownOnSlider, setIsMouseDownOnSlider] = useState(false);
  const audioRef = useRef(null);
  const seekBar = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.addEventListener("loadeddata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      if (!isMouseDownOnSlider) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    });

    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });

    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("loadeddata");
      audio.removeEventListener("timeupdate");
      audio.removeEventListener("play");
      audio.removeEventListener("pause");
      audio.removeEventListener("ended");
    };
  }, [currentSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeekBarChange = () => {
    const audio = audioRef.current;
    const pct = seekBar.current.value / 100;
    setCurrentTime(newTime);
    setProgress(pct * 100);
  };

  const handleMouseUp = () => {
    setIsMouseDownOnSlider(false);
  };
  const handleMouseDown = () => {
    setIsMouseDownOnSlider(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      {currentSong ? (
        <div>
          <div>
            {currentSong.title} - {currentSong.artist}
          </div>
          <div className="flex items-center">
            <button
              onClick={handlePlayPause}
              className={`bg-${isPlaying ? "red" : "blue"}-500 p-2 rounded`}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <div className="seek-bar">
              <input
                ref={seekBar}
                type="range"
                min={0}
                max={100}
                value={progress}
                step={1}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
                onChange={handleSeekBarChange}
              />
            </div>
            <div className="ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          <audio
            ref={audioRef}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream?url=${currentSong.file_url}`}
          />
        </div>
      ) : (
        <div>Select a song to play</div>
      )}
    </div>
  );
};

export default Controller;
