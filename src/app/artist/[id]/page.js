"use client";
import AlbumsSection from "@/components/AlbumsSection/AlbumsSection";
import FetchData from "@/components/FetchData/FetchData";
import Loading from "@/components/Loading/Loading";
import LongCardList from "@/components/LongCardList/LongCardList";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = params;
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bioVisible, setBioVisible] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const artist = await FetchData(`api/artist/${id}`);
      setArtist(artist);

      const [albums, tracks] = await Promise.all([
        FetchData(`api/album?artist=${artist.artist}&limit=-1`),
        FetchData(`api/random/track?artist=${artist.artist}&limit=5`),
      ]);

      setAlbums(albums.data);
      setTracks(tracks);
    }

    fetchData().finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  const biographyHtml = artist.biography?.replace(/\n/g, "<br>") || "";

  return (
    <>
      <div className="relative flex items-start pt-64">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={artist.image_url}
            alt={artist.artist}
            priority={true}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out"
          />
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 transition-all duration-500 ease-in-out ${
            bioVisible ? "h-full" : "h-1/2"
          } bg-gradient-to-t from-gray-950`}
        ></div>
        <div className="relative text-white xl:px-56 lg:px-28 md:px-20 sm:px-20 px-5 w-full">
          <div className="flex items-center">
            <p className="text-5xl font-bold break-words w-full">
              {artist.artist}
            </p>
          </div>
          {artist.biography ? (
            <>
              <div
                className={`font-light py-2 overflow-hidden text-sm transition-all duration-500 ease-in-out ${
                  bioVisible ? "max-h-[1000px]" : "max-h-12"
                } hidden lg:block`}
                dangerouslySetInnerHTML={{ __html: biographyHtml }}
              />
              <div
                className={`text-xl text-gray-200 hidden lg:block transition-all duration-500 ease-in-out opacity-${
                  bioVisible ? "0" : "100"
                }`}
              >
                <span> . . . </span>
              </div>
              <button
                onClick={() => setBioVisible(!bioVisible)}
                className="mt-4 text-white hover:underline hidden lg:block"
              >
                {bioVisible ? "Show Less" : "Read More"}
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="xl:px-56 lg:px-28 md:px-20 sm:px-20 px-5 mb-16 bg-gray-950 text-white">
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
            <Link
              href={`/artist/${artist._id}/track`}
              className="hover:text-[#766df4] hover:underline"
            >
              More
            </Link>
          </div>
          <div className="flex flex-col">
            <LongCardList data={tracks} />
          </div>
        </div>
        <AlbumsSection albums={albums} artist={artist} />
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
