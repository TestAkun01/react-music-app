"use client";

import CardList from "@/components/CardList";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import PaginationButton from "@/components/PaginationButton/PaginationButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { category } = params;

  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  let urlCategory = "";
  if (category === "All") {
    urlCategory = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song?page=${page}`;
  } else {
    urlCategory = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song?category=${category}&page=${page}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataSong, dataCategories] = await Promise.all([
          FetchData(urlCategory),
          FetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category`),
        ]);
        setSongs(dataSong.data);
        setTotalPages(dataSong.pagination.totalPages);
        setCategories(dataCategories.map((cat) => cat.category));
      } catch (error) {
        console.error("Error fetching data:", error);
        setSongs([]);
      }
    };

    fetchData();
  }, [page]);

  const handleCategorySelect = async (category) => {
    router.push(`${category}`);
    setPage(1);
  };

  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 min-h-screen">
      <Header title={`Category: ${decodeURIComponent(category)}`} />
      <CategoryButtons categories={categories} handle={handleCategorySelect} />
      <CardList data={songs} />

      <PaginationButton
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
