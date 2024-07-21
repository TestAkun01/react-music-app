"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import FetchData from "../FetchData/FetchData";
import Link from "next/link";
export default function PosterContent() {
  const [randomAlbum, setRandomAlbum] = useState([]);

  useEffect(() => {
    async function getRandomAlbum() {
      const Response = await FetchData("api/random?limit=5");
      setRandomAlbum(Response);
    }
    getRandomAlbum();
  }, []);
  return (
    <div className="w-full md:max-w-[349px] h-full text-white md:ps-8">
      <div
        className="md:fixed"
        style={{ maxWidth: "inherit", width: "inherit" }}
      >
        <Header title={"Recomendation"} />
        <div className="flex flex-col gap-4">
          {randomAlbum?.map((item) => (
            <>
              <Link
                href={`/song/${item._id}`}
                className="rounded cursor-pointer transition-all duration-300 hover:bg-gray-900  hover:shadow-md hover:shadow-[#766df4]"
              >
                <div className="flex items-center">
                  <div className="flex items-center gap-x-3">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="inline-block h-[87px] w-[87px] rounded"
                    />
                    <div>
                      <h6 className="text-sm font-semibold">{item.title}</h6>
                      <p className="text-sm font-light text-gray-300">
                        {item.artist.map((data) => data.artist).join(" & ")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <hr className="border-gray-800 w-full last:hidden" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
