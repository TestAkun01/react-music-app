"use client";

import CardList from "@/components/CardList";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import PaginationButton from "@/components/PaginationButton/PaginationButton";
import SideContent from "@/components/SideContent/SideContent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { category } = params;

  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  let path = "";
  if (category === "All") {
    path = `api/album?page=${page}&limit=12`;
  } else {
    path = `api/album?category=${category}&limit=12&page=${page}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const [dataSong, dataCategories] = await Promise.all([
        FetchData(path),
        FetchData(`api/category`),
      ]);
      setSongs(dataSong.data);
      setTotalPages(dataSong.pagination.totalPages);
      setCategories(dataCategories);
    };

    fetchData().finally(() => setIsLoading(false));
  }, [page]);

  const handleCategorySelect = async (category) => {
    router.push(`${category}`);
    setPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5 mb-16 min-h-screen">
      <div className="grid md:grid-cols-12 gap-8 md:divide-x divide-gray-900">
        <div className="md:col-span-8">
          <Header title={`Category: ${decodeURIComponent(category)}`} />
          <CategoryButtons
            categories={categories}
            handle={handleCategorySelect}
          />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 w-full">
            <CardList data={songs} />
          </div>
          <PaginationButton
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
        <div className="md:col-span-4">
          <SideContent />
        </div>
      </div>
    </div>
  );
}
