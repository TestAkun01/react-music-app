"use client";

import Loading from "@/app/loading";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import TrackController from "@/components/MusicController/TrackController";
import Image from "next/legacy/image";
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
    <div className="relative min-h-screen overflow-hidden">
      {data ? (
        <div className="fixed inset-0 z-[-1]">
          <Image
            src={data.cover}
            priority={true}
            layout="fill"
            objectFit="cover"
            className="blur-3xl opacity-30"
            alt="Background"
          />
        </div>
      ) : null}

      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 min-h-screen text-neutral-50 relative">
        {data ? (
          <div className="w-full rounded-lg shadow-lg p-4 bg-gray-800 bg-opacity-75">
            <div className="flex">
              <div className="w-[300px] m-4">
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
                <p className="mb-4">
                  Artist:{" "}
                  {data.artist
                    .map((dataArtist) => dataArtist.artist)
                    .join(" & ")}
                </p>
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
            <hr className="my-4 border-gray-400" />
            <div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <p className="mb-2 text-3xl text-center">Artist</p>
                  {data.artist.map((artist) => {
                    return (
                      <div
                        className="flex flex-col items-center my-8"
                        key={artist._id}
                      >
                        <div className="relative w-24 h-24  object-cover rounded-full overflow-hidden">
                          <Image
                            src={artist.image_url}
                            alt={artist.artist}
                            className=""
                            width={400}
                            height={400}
                            objectFit="cover"
                            quality={100}
                          />
                        </div>
                        <p className="text-sm font-light my-4">
                          {artist.artist}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-10">
                  <p className="mb-2 text-3xl">Track List</p>
                  <div className="overflow-y-auto max-h-96 shadow-inner shadow-gray-700 border border-2 border-gray-700 rounded-lg bg-gray-950 p-4">
                    <ul>
                      {data.track.map((track) => (
                        <li key={track._id} className="mb-2">
                          <TrackController track={track} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
}
