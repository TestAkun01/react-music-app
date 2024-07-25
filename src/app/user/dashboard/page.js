"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "@/app/loading";
import FetchData from "@/components/FetchData/FetchData";
import SongCard from "@/components/CardForUser/CardSong";

const fetchDataAndSongs = async (endpoints, query, setStates, addSongs) => {
  try {
    const [historyData, likeData, mostPlayedData] = await Promise.all(
      endpoints.map((endpoint) => FetchData(endpoint, query))
    );

    setStates.history(historyData);
    setStates.like(likeData);
    setStates.mostPlayed(mostPlayedData);

    const allTrackIds = [
      ...new Set([
        ...historyData.map((item) => item.trackId || item._id),
        ...likeData.map((item) => item.trackId || item._id),
        ...mostPlayedData.map((item) => item.trackId || item._id),
      ]),
    ];

    const songDataArray = await FetchData(`api/track`, "", "POST", {
      action: "fetch",
      ids: allTrackIds,
    });

    const songsObject = songDataArray.reduce((acc, song) => {
      acc[song._id] = song;
      return acc;
    }, {});

    addSongs(songsObject);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export default function Page() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [like, setLike] = useState([]);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [songs, setSongs] = useState({});
  const [isDisplaying, setIsDisplaying] = useState("rencentlyPlayed");

  const addSongs = (newSongs) => {
    setSongs((prevSongs) => ({ ...prevSongs, ...newSongs }));
  };

  useEffect(() => {
    if (session) {
      const userIdQuery = `userId=${session.user.email}`;
      fetchDataAndSongs(
        ["api/history-watch", "api/like", "api/most-played"],
        userIdQuery,
        { history: setHistory, like: setLike, mostPlayed: setMostPlayed },
        addSongs
      );
    }
  }, [session]);

  const handleIsDisplaying = (display) => {
    setIsDisplaying(display);
  };
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="mt-8 min-h-screen text-white xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
      {session ? (
        <div className="flex md:flex-row flex-col md:gap-16 gap-8">
          <div className="md:mt-16 md:block flex gap-2">
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={200}
              height={200}
              className="md:w-[270px] w-[150px] md:h-[270px] h-[150px] rounded-[50%] border border-2 border-gray-700 md:mb-16"
            />
            <div className="md:block flex flex-col justify-center">
              <p className="md:text-3xl text-xl font-bold">
                Welcome, {session.user.name}!
              </p>
              <p>{session.user.email}</p>
            </div>
          </div>
          <main className="flex-1 p-4">
            <section>
              <div className="flex mb-4 ">
                <button
                  className={`text-2xl px-4 pt-2 shrink-0 font-medium border-white ${
                    isDisplaying === "rencentlyPlayed"
                      ? "border border-b-0"
                      : "border-b"
                  } `}
                  onClick={() => handleIsDisplaying("rencentlyPlayed")}
                >
                  Recently
                </button>
                <button
                  className={`text-2xl px-4 pt-2 font-medium border-white ${
                    isDisplaying === "like" ? "border border-b-0" : "border-b"
                  }`}
                  onClick={() => handleIsDisplaying("like")}
                >
                  Like
                </button>
                <button
                  className={`text-2xl px-4 pt-2 font-medium border-white border-b ${
                    isDisplaying === "history"
                      ? "border border-b-0"
                      : "border-b"
                  }`}
                  onClick={() => handleIsDisplaying("history")}
                >
                  History
                </button>
                <div className="w-full border-b boredr-white"></div>
              </div>
              <div className="flex flex-col gap-4">
                {isDisplaying == "rencentlyPlayed"
                  ? mostPlayed.map((item) => (
                      <SongCard
                        key={item._id}
                        track={songs[item._id]}
                        totalPlay={item.play_count}
                      />
                    ))
                  : isDisplaying == "like"
                  ? like.map((item) => (
                      <SongCard
                        key={item._id}
                        track={songs[item.trackId]}
                        date={item.likedAt}
                      />
                    ))
                  : isDisplaying == "history"
                  ? history.map((item) => (
                      <SongCard
                        key={item._id}
                        track={songs[item._id]}
                        date={item.watchedAt}
                      />
                    ))
                  : null}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <p>You are not logged in. Please log in to access the dashboard.</p>
      )}
    </div>
  );
}
