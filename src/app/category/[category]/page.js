"use client";

import CardList from "@/components/CardList";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import PaginationButton from "@/components/PaginationButton/PaginationButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { category } = params;

  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  let path = "";
  let q = "";
  if (category === "All") {
    path = `api/album`;
    q = `page=${page}`;
  } else {
    path = `api/album`;
    q = `category=${category}&page=${page}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const [dataSong, dataCategories] = await Promise.all([
        FetchData(path, q),
        FetchData(`api/category`),
      ]);
      setSongs(dataSong.data);
      setTotalPages(dataSong.pagination.totalPages);
      setCategories(dataCategories.map((cat) => cat.category));
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
