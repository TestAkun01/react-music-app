"use client";
import CardList from "@/components/CardList";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import SideContent from "@/components/SideContent/SideContent";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomArtist, setrandomArtist] = useState([]);
  const [categoryAlbums, setCategoryAlbums] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const [latestSongs, categoryList, randomArtist] = await Promise.all([
        FetchData(`api/album?limit=4`),
        FetchData(`api/category`),
        FetchData(`api/random/artist?limit=4`),
      ]);

      setLatest(latestSongs.data);
      let filteredCategories = categoryList.filter(
        (cat) => cat.category !== "All"
      );
      filteredCategories = filteredCategories.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setCategories(filteredCategories);
      setrandomArtist(randomArtist);
      const albumsByCategoryPromises = filteredCategories.map(async (cat) => {
        const albums = await FetchData(
          `api/album?category=${cat.category}&limit=4`
        );
        return { category: cat.category, albums: albums.data };
      });

      const albumsByCategory = await Promise.all(albumsByCategoryPromises);
      const albumsByCategoryMap = albumsByCategory.reduce((acc, curr) => {
        acc[curr.category] = curr.albums;
        return acc;
      }, {});

      setCategoryAlbums(albumsByCategoryMap);
    };

    fetchInitialData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="pb-16">
        <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
          <div className="grid md:grid-cols-12 gap-8 md:divide-x divide-gray-900">
            <div className="md:col-span-8">
              <Header title="New Music" />
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 w-full">
                <CardList data={latest} />
              </div>
              <Header title="Artist" />
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 max-w-full">
                {randomArtist.map((artist) => (
                  <Link
                    href={`/artist/${artist._id}`}
                    className="flex flex-col items-center my-8 max-w-[200px] w-full mx-auto"
                    key={artist._id}
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={artist.image_url}
                        alt={`Image ${artist.artist}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        priority="true"
                      />
                    </div>
                    <p className="text-sm font-semibold my-4 text-neutral-50">
                      {artist.artist}
                    </p>
                  </Link>
                ))}
              </div>

              {categories.map((cat) => (
                <div key={cat._id}>
                  <Header title={cat.category} key={cat._id} />
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 w-full">
                    <CardList data={categoryAlbums[cat.category] || []} />
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-4">
              <SideContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
