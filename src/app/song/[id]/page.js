// pages/Page.js

"use client";

import Loading from "@/app/loading";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import TrackController from "@/components/MusicController/TrackController";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const path = `api/album/${id}`;
      const data = await FetchData(path);
      setData(data);
    };

    fetchData();
  }, [id]);

  const handleRedirect = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="container mx-auto p-4 w-full min-h-screen text-neutral-50">
      {data ? (
        <div className="max-w-screen-lg mx-auto bg-gray-900 rounded-lg shadow-lg p-4">
          <div className="flex">
            <div className="w-[350px] m-4">
              <Image
                src={data.cover}
                alt={data.title}
                className="w-full h-auto object-cover"
                width={350}
                height={350}
              />
            </div>
            <div className=" w-full">
              <h1 className="text-3xl mb-2">{data.title}</h1>
              <p className="mb-4">Artist: {data.artist}</p>
              <p className="mb-4">Release Date: {data.release_date}</p>
              <div className="mb-4">
                <p className="mb-2">Category:</p>
                <CategoryButtons
                  categories={data.category}
                  handle={handleRedirect}
                ></CategoryButtons>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-2">Track List</h2>
            <div className="overflow-y-auto max-h-96">
              <ul>
                {data.list.map((track) => (
                  <li key={track._id} className="mb-2">
                    <TrackController track={track} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}
