"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import FetchData from "../FetchData/FetchData";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SideContent() {
  const [randomAlbum, setRandomAlbum] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function getRandomAlbum() {
      const today = new Date().toISOString().split("T")[0];
      const storedData = localStorage.getItem(`randomAlbum-${today}`);
      if (storedData) {
        setRandomAlbum(JSON.parse(storedData));
      } else {
        const response = await FetchData("api/random/album?limit=5");
        localStorage.setItem(`randomAlbum-${today}`, JSON.stringify(response));
        setRandomAlbum(response);
      }
    }
    getRandomAlbum();
  }, []);

  return (
    <div className="w-full md:max-w-[349px] h-full text-white md:ps-8">
      <div
        className="md:fixed"
        style={{ maxWidth: "inherit", width: "inherit" }}
      >
        <Header title={"Recommendation"} />
        <div className="flex flex-col gap-4">
          {randomAlbum?.map((item) => (
            <div
              key={item._id}
              className="cursor-pointer transition-all duration-300 hover:bg-gray-900 hover:shadow-md hover:shadow-[#766df4]"
            >
              <Link href={`/song/${item._id}`} className="rounded">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="inline-block h-[82px] w-[82px] rounded"
                    />
                    <div className="px-4">
                      <p className="text-sm line-clamp-2">{item.title}</p>
                      <div className="text-sm font-light text-gray-300">
                        {item.artist.map((artist, index) => (
                          <span key={artist._id}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                router.push(`/artist/${artist._id}`);
                              }}
                              className="hover:underline"
                            >
                              {artist.artist}
                            </button>
                            {index < item.artist.length - 1 && " & "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}