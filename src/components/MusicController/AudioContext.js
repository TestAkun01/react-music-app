"use client";

import { useSession } from "next-auth/react";
import React, { useState, createContext, useRef, useEffect } from "react";
import FetchData from "../FetchData/FetchData";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [loopMode, setLoopMode] = useState("none");
  const { data: session } = useSession();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const handleLoadedData = () => {
      setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleEnded = () => {
      if (loopMode === "none") {
        if (playlist.length > 0 && playlistIndex + 1 < playlist.length) {
          playNext();
        } else {
          setIsPlaying(false);
        }
      } else if (loopMode === "playlist") {
        playNext();
      } else if (loopMode === "song") {
        playTrackFromPlaylist(currentTrack);
      }
    };

    audioRef.current.addEventListener("loadeddata", handleLoadedData);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current.removeEventListener("loadeddata", handleLoadedData);
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [playlistIndex, playlist, loopMode]);

  const handleHistory = (track) => {
    FetchData("api/history-watch", "", "POST", {
      userId: session.user.email,
      trackId: track._id,
    });
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = "";
    audioRef.current.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream?url=${track.file_url}`;
    audioRef.current.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
    setPlaylist([track]);
    session ? handleHistory(track) : null;
  };

  const playTrackFromPlaylist = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = "";
    audioRef.current.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stream?url=${track.file_url}`;
    audioRef.current.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
    const index = playlist.findIndex((item) => item._id === track._id);
    setPlaylistIndex(index);
    session ? handleHistory(track) : null;
  };

  const playNext = () => {
    const nextIndex = playlistIndex + 1;
    if (nextIndex < playlist.length) {
      playTrackFromPlaylist(playlist[nextIndex]);
      setPlaylistIndex(nextIndex);
    } else if (loopMode === "playlist" || loopMode === "song") {
      playTrackFromPlaylist(playlist[0]);
      setPlaylistIndex(0);
    }
  };

  const playPrev = () => {
    const prevIndex = playlistIndex - 1;
    if (prevIndex >= 0) {
      playTrackFromPlaylist(playlist[prevIndex]);
      setPlaylistIndex(prevIndex);
    } else if (loopMode === "playlist" || loopMode === "song") {
      playTrackFromPlaylist(playlist[playlist.length - 1]);
      setPlaylistIndex(playlist.length - 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSetVolume = (volume) => {
    setVolume(volume);
    audioRef.current.volume = volume;
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
  };

  const addToPlaylist = (track) => {
    const trackExists = playlist.some((item) => item._id === track._id);

    if (!trackExists) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
    }
  };

  const removeTrack = (trackId) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.filter((track) => track._id !== trackId)
    );
    const index = playlist.findIndex((item) => item._id === trackId);
    setPlaylistIndex(index);
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    setPlaylistIndex(0);
  };

  const toggleLoop = () => {
    switch (loopMode) {
      case "none":
        setLoopMode("playlist");
        break;
      case "playlist":
        setLoopMode("song");
        break;
      case "song":
        setLoopMode("none");
        break;
      default:
        break;
    }
  };
  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        playTrack,
        playTrackFromPlaylist,
        togglePlay,
        setVolume: handleSetVolume,
        seek,
        audioRef,
        addToPlaylist,
        removeTrack,
        clearPlaylist,
        playNext,
        playPrev,
        toggleLoop,
        loopMode,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
