"use client";
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
          FetchData(`api/album?artist=${artist.artist}&limit=5`),
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
        className={`relative flex items-end min-h-[${
          bioVisible ? "70vh" : "50vh"
        }] mb-8 transition-all duration-300 ease-in-out`}
      >
        <div className="absolute inset-0">
          <Image
            src={artist.image_url}
            alt={artist.artist}
            layout="fill"
            objectFit="cover"
            className="opacity-60"
          />
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 ${
            bioVisible ? "h-full" : "h-1/3"
          } bg-gradient-to-t from-gray-950 transition-all duration-300 ease-in-out`}
        ></div>
        <div className="relative text-white xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 w-[70%]">
          <div className="flex items-center">
            <p className="text-7xl font-bold">{artist.artist}</p>
            <img
              src="https://i.bandori.party/u/asset/rG9qQzRoselia-Icon-tsnAAi.png"
              className="w-8 h-8 ml-4"
              alt="Artist Icon"
            />
          </div>
          <div
            className={`font-light text-sm overflow-hidden transition-all duration-500 ease-in-out ${
              bioVisible ? "opacity-100 max-h-[1000px]" : "opacity-70 max-h-10"
            } hidden lg:block`}
            dangerouslySetInnerHTML={{ __html: biographyHtml }}
          />
          <button
            onClick={() => setBioVisible(!bioVisible)}
            className="mt-4 text-blue-500 hover:underline hidden lg:block"
          >
            {bioVisible ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 min-h-screen bg-gray-950 text-white">
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
                  <p className="text-sm font-medium text-gray-300">
                    {track.title}
                  </p>
                  <p className="text-sm font-medium text-gray-300">
                    {track.album_id.title}
                  </p>
                  <p className="text-sm text-gray-400 justify-self-end">
                    {track.duration ? track.duration : ". . . ."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Albums</h2>
          <div className="flex gap-4">
            {albums.map((album) => (
              <div
                key={album._id}
                className="rounded-lg shadow-md max-w-[200px]"
              >
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={800}
                  height={800}
                  className="rounded-sm"
                />
                <h3 className="text-md font-semibold mt-4">{album.title}</h3>
                <p className="text-md font-light text-gray-400">
                  {album.release_date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 text-white block md:hidden">
        <p className="text-2xl font-semibold mb-4">About</p>
        <div
          onClick={() => setBioVisible(!bioVisible)}
          className={`font-light text-sm cursor-pointer overflow-hidden transition-all duration-500 ease-in-out ${
            bioVisible ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-70"
          }`}
          dangerouslySetInnerHTML={{ __html: biographyHtml }}
        />
      </div>
    </>
  );
}
