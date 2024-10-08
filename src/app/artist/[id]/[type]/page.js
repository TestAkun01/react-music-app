"use client";
import CardAlbum from "@/components/CardAlbum/CardAlbum";
import LongCardList from "@/components/LongCardList/LongCardList";
import FetchData from "@/components/FetchData/FetchData";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

export default function Page({ params }) {
  const { id, type } = params;
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const artist = await FetchData(`api/artist/${id}`);
      setArtist(artist);

      const [albums, tracks] = await Promise.all([
        FetchData(`api/album?artist=${artist.artist}&limit=-1`),
        FetchData(`api/track?artist=${artist.artist}&limit=-1&populateAlbum=1`),
      ]);

      setAlbums(albums.data);
      setTracks(tracks);
    }

    fetchData().finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  const renderContent = () => {
    switch (type) {
      case "track":
        return <LongCardList data={tracks} />;
      case "single":
        return (
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
            <CardAlbum
              data={albums.filter((album) => album.type === "Single")}
            />
          </div>
        );
      case "ep":
        return (
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
            <CardAlbum data={albums.filter((album) => album.type === "EP")} />
          </div>
        );
      case "album":
        return (
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
            <CardAlbum
              data={albums.filter((album) => album.type === "Album")}
            />
          </div>
        );
      default:
        notFound();
    }
  };
  function redirect(path) {
    router.push(`/artist/${id}/${path}`);
  }
  return (
    <>
      <div className={`relative flex items-end min-h-[45vh] w-full`}>
        <div className="absolute inset-0">
          <Image
            src={artist.image_url}
            alt={artist.artist}
            priority={true}
            layout="fill"
            objectFit="cover"
            className="object-top"
          />
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950`}
        ></div>
        <div className="relative text-white xl:px-56 lg:px-28 md:px-20 sm:px-20 px-5 lg:w-[55%] w-full mb-20">
          <div className="flex items-center">
            <p className="text-5xl font-bold break-words w-full">
              {artist.artist}
            </p>
          </div>
        </div>
      </div>
      <div className="text-white xl:px-56 lg:px-28 md:px-20 sm:px-20 px-5">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              type === "track"
                ? "text-[#766df4]"
                : "text-gray-300 hover:underline"
            }`}
            onClick={() => redirect("track")}
          >
            Track
          </button>
          <button
            className={`px-4 py-2 rounded ${
              type === "single"
                ? "text-[#766df4]"
                : "text-gray-300 hover:underline"
            }`}
            onClick={() => redirect("single")}
          >
            Single
          </button>
          <button
            className={`px-4 py-2 rounded ${
              type === "ep" ? "text-[#766df4]" : "text-gray-300 hover:underline"
            }`}
            onClick={() => redirect("ep")}
          >
            EP
          </button>
          <button
            className={`px-4 py-2 rounded ${
              type === "album"
                ? "text-[#766df4]"
                : "text-gray-300 hover:underline"
            }`}
            onClick={() => redirect("album")}
          >
            Album
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
}
