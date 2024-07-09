"use client";

import CardList from "@/components/CardList";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import PaginationButton from "@/components/PaginationButton/PaginationButton";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [latest, setLatest] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      const q = `latest=1&page=${page}`;
      const latestSongs = await FetchData(`api/song`, q);
      console.log(latestSongs);
      setLatest(latestSongs.data);
      setTotalPages(latestSongs.pagination.totalPages);
    };

    fetchInitialData();
  }, [page]);
  return (
    <div className="mb-16 min-h-screen">
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
        <Header title="New Music" />
        <CardList data={latest} />
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
