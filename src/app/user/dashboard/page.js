"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "@/app/loading";
import FetchData from "@/components/FetchData/FetchData";
import SongCard from "@/components/CardForUser/CardSong";

const fetchDataAndSongs = async (endpoint, query, setData, addSongs) => {
  try {
    const data = await FetchData(endpoint, query);
    setData(data);

    const songPromises = data.map((item) =>
      FetchData(`api/track/${item.trackId || item._id}`)
    );
    const songDataArray = await Promise.all(songPromises);

    const songsObject = songDataArray.reduce((acc, song, index) => {
      acc[data[index].trackId || data[index]._id] = song;
      return acc;
    }, {});

    addSongs(songsObject);
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
  }
};

export default function Page() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [like, setLike] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [songs, setSongs] = useState({});

  const addSongs = (newSongs) => {
    setSongs((prevSongs) => ({ ...prevSongs, ...newSongs }));
  };

  useEffect(() => {
    if (session) {
      const userIdQuery = `userId=${session.user.email}`;
      fetchDataAndSongs("api/history-watch", userIdQuery, setHistory, addSongs);
      fetchDataAndSongs("api/like", userIdQuery, setLike, addSongs);
      fetchDataAndSongs(
        "api/most-played",
        userIdQuery,
        setMostPlayed,
        addSongs
      );
    }
  }, [session]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="p-4 min-h-screen text-white xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {session ? (
        <>
          <div className="flex gap-8">
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={200}
              height={200}
              className="w-32 h-32 rounded-[50%]"
            />
            <div className="flex flex-col justify-center gap-4">
              <p className="text-3xl font-bold">
                Welcome, {session.user.name}!
              </p>
              <p>{session.user.email}</p>
            </div>
          </div>
          <main className="flex-1 p-4 bg-gray-950">
            <section>
              <h2 className="text-2xl mb-4">Recently Played</h2>
              <div className="grid grid-cols-5 gap-4">
                {mostPlayed.map((item) => (
                  <SongCard
                    key={item._id}
                    song={songs[item._id]}
                    totalPlay={item.play_count}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl mb-4">Likes</h2>
              <div className="grid grid-cols-5 gap-4">
                {like.map((item) => (
                  <SongCard
                    key={item._id}
                    song={songs[item.trackId]}
                    date={item.likedAt}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl mb-4">History</h2>
              <div className="grid grid-cols-5 gap-4">
                {history.map((item) => (
                  <SongCard
                    key={item._id}
                    song={songs[item._id]}
                    date={item.watchedAt}
                  />
                ))}
              </div>
            </section>
          </main>
        </>
      ) : (
        <p>You are not logged in. Please log in to access the dashboard.</p>
      )}
    </div>
  );
}
