"use client";
import AlbumsSection from "@/components/AlbumsSection/AlbumsSection";
import FetchData from "@/components/FetchData/FetchData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = params;
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bioVisible, setBioVisible] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const artist = await FetchData(`api/artist/${id}`);
        setArtist(artist);

        const [albums, tracks] = await Promise.all([
          FetchData(`api/album?artist=${artist.artist}&limit=-1`),
          FetchData(`api/random/track?artist=${artist.artist}&limit=5`),
        ]);

        setAlbums(albums.data);
        setTracks(tracks);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  const biographyHtml = artist.biography?.replace(/\n/g, "<br>") || "";

  return (
    <>
      <div
        style={{ minHeight: bioVisible ? "70vh" : "50vh" }}
        className={`relative flex items-end mb-8 transition-all duration-300 ease-in-out`}
      >
        <div className="absolute inset-0">
          <Image
            src={artist.image_url}
            alt={artist.artist}
            layout="fill"
            objectFit="cover"
            className="object-top"
          />
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 ${
            bioVisible ? "h-full" : "h-1/3"
          } bg-gradient-to-t from-gray-950 transition-all duration-300 ease-in-out`}
        ></div>
        <div className="relative text-white xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 w-[55%]">
          <div className="flex items-center">
            <p className="text-5xl font-bold">{artist.artist}</p>
          </div>
          {artist.biography ? (
            <>
              <div
                className={`font-light py-2 overflow-hidden text-sm transition-all duration-500 ease-in-out ${
                  bioVisible ? "max-h-[1000px]" : "max-h-10"
                } hidden lg:block`}
                dangerouslySetInnerHTML={{ __html: biographyHtml }}
              />
              {!bioVisible && artist.biography.length > 200 && (
                <>
                  <div className="text-xl text-gray-200 hidden lg:inline">
                    <span> . . . </span>
                  </div>
                  <button
                    onClick={() => setBioVisible(!bioVisible)}
                    className="mt-4 text-white hover:underline hidden lg:block"
                  >
                    {bioVisible ? "Show Less" : "Read More"}
                  </button>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 bg-gray-950 text-white">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
          <div className="flex flex-col divide-y divide-gray-800">
            {tracks.map((track) => (
              <div key={track._id} className="py-4">
                <div className="rounded-lg grid grid-cols-5 items-center">
                  <div className="block">
                    <Image
                      src={track.cover}
                      alt={track.title}
                      width={100}
                      height={100}
                      className="h-[60px] w-auto"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-300">
                    {track.artist.map((data) => data.artist).join(" & ")}
                  </p>
                  <p className="text-sm font-medium text-gray-300 line-clamp-2">
                    {track.title}
                  </p>
                  <p className="text-sm font-medium text-gray-300 line-clamp-2">
                    {track.album_id.title}
                  </p>
                  <p className="text-sm text-gray-400 justify-self-end line-clamp-2">
                    {track.duration ? track.duration : ". . . ."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AlbumsSection albums={albums} />
      </div>
      {artist.biography ? (
        <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 text-white lg:hidden block">
          <p className="text-2xl font-semibold mb-4">About</p>
          <div
            onClick={() => setBioVisible(!bioVisible)}
            className={`font-light text-sm cursor-pointer overflow-hidden transition-all duration-500 ease-in-out ${
              bioVisible ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-70"
            }`}
            dangerouslySetInnerHTML={{ __html: biographyHtml }}
          />
        </div>
      ) : null}
    </>
  );
}
