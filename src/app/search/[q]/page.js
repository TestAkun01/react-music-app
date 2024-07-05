"use client";

import CardList from "@/components/CardList";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { q } = params;
  const [filteredSong, setFilteredSong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const searchURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?q=${q}`;
      const result = await FetchData(searchURL);
      setFilteredSong(result.data);
    };

    fetchData();
  }, [q]);

  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 min-h-screen">
      <Header title={`Search by ${decodeURIComponent(q)}`} />
      {filteredSong.length === 0 ? (
        <div className="flex flex-col items-center text-neutral-50">
          <h1 className="font-bold text-3xl">No results found</h1>
          <p className="text-xl">Try searching for something else</p>
        </div>
      ) : (
        <CardList data={filteredSong} />
      )}
    </div>
  );
}
