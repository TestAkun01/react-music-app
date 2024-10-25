"use client";

import Loading from "@/app/loading";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import TrackController from "@/components/MusicController/TrackController";
import Image from "next/legacy/image";
import Link from "next/link";
import CommentSection from "@/components/CommentSection/CommentSection";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const path = `api/album/${id}`;
      const data = await FetchData(path);
      if (data === null) {
        notFound();
      }
      setData(data ?? {});
    };

    fetchData().finally(() => setIsLoading(false));
  }, [id]);

  const handleRedirect = (category) => {
    router.push(`/category/${category}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
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

      <div className="xl:mx-40 lg:mx-28 lg:mx-20 sm:mx-20 mx-5 min-h-screen text-neutral-50 relative">
        <div className="w-full rounded-lg shadow-lg p-4 bg-gray-800 bg-opacity-75">
          <div className="flex lg:flex-row flex-col">
            <div className="relative w-[300px] aspect-square m-4">
              <Image
                src={data.cover}
                alt={`Image ${data.title}`}
                layout="fill"
                objectFit="cover"
                priority="true"
              />
            </div>
            <div className="w-auto m-4">
              <h1 className="text-3xl mb-2">{data.title}</h1>
              <p className="mb-4">
                Artist:{" "}
                {data.artist.map((dataArtist) => dataArtist.artist).join(" & ")}
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
              <div className="lg:col-span-2 col-span-full">
                <p className="mb-2 text-3xl">Artist</p>
                <div className="lg:block flex gap-4 w-full h-full lg:overflow-visible overflow-x-auto">
                  {data.artist.map((artist) => (
                    <Link
                      href={`/artist/${artist._id}`}
                      className="flex flex-col items-center my-8 w-full min-w-[200px]"
                      key={artist._id}
                    >
                      <div className="relative w-1/2 aspect-square">
                        <Image
                          src={artist.image_url}
                          alt={`Image ${artist.artist}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                          priority="true"
                        />
                      </div>
                      <p className="text-sm font-light my-4">{artist.artist}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-10 col-span-full">
                <p className="mb-2 text-3xl">Track List</p>
                <div className="overflow-y-auto max-h-96 shadow-inner shadow-gray-700 border border-2 border-gray-700 rounded-lg bg-gray-950 p-4">
                  <ul className="flex flex-col gap-2">
                    {data.track.map((track) => (
                      <li key={track._id}>
                        <TrackController track={{ ...track, album_id: data }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-full">
                <CommentSection albumId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
