"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "@/app/loading";

export default function Page() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session);
  });
  if (status === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className="mx-auto p-4 w-full min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {session && (
        <>
          <div>
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={200}
              height={200}
              className="w-32 h-32 rounded-[50%]"
            ></Image>
            <p>Welcome, {session.user.name}!</p>
            <p>Email: {session.user.email}</p>
          </div>
          <main className="flex-1 p-4 bg-gray-950">
            <section>
              <h2 className="text-2xl mb-4">Recently Played</h2>
              <div className="grid grid-cols-4 gap-4">
                {/* Repeat for each song */}
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src="/path/to/cover.jpg"
                    alt="Song Cover"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg">Song Title</h3>
                  <p className="text-gray-600">Artist Name</p>
                </div>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl mb-4">Top Playlists</h2>
              <div className="grid grid-cols-4 gap-4">
                {/* Repeat for each playlist */}
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src="/path/to/playlist-cover.jpg"
                    alt="Playlist Cover"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg">Playlist Name</h3>
                </div>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl mb-4">Recommended for You</h2>
              <div className="grid grid-cols-4 gap-4">
                {/* Repeat for each recommendation */}
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src="/path/to/recommendation-cover.jpg"
                    alt="Recommendation Cover"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg">Recommendation Title</h3>
                  <p className="text-gray-600">Artist Name</p>
                </div>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-2xl mb-4">Genres</h2>
              <div className="grid grid-cols-4 gap-4">
                {/* Repeat for each genre */}
                <div className="bg-white p-4 rounded shadow">
                  <img
                    src="/path/to/genre-cover.jpg"
                    alt="Genre Cover"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg">Genre Name</h3>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
      {!session && (
        <p>You are not logged in. Please log in to access the dashboard.</p>
      )}
    </div>
  );
}
