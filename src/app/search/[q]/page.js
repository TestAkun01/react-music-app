"use client";

import CardList from "@/components/CardList";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import SideContent from "@/components/SideContent/SideContent";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { q } = params;
  const [filteredSong, setFilteredSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData(`api/search?q=${q}`);

      setFilteredSong(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 min-h-screen">
      <div className="grid md:grid-cols-12 gap-8 md:divide-x divide-gray-900">
        <div className="md:col-span-8">
          <Header title={`Search by ${decodeURIComponent(q)}`} />
          {isLoading ? (
            <Loading></Loading>
          ) : filteredSong.length === 0 ? (
            <div className="flex flex-col items-center text-neutral-50">
              <h1 className="font-bold text-3xl">No results found</h1>
              <p className="text-xl">Try searching for something else</p>
            </div>
          ) : (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 max-w-max">
              <CardList data={filteredSong} />
            </div>
          )}
        </div>
        <div className="md:col-span-4">
          <SideContent />
        </div>
      </div>
    </div>
  );
}
