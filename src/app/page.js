"use client";
import CardList from "@/components/CardList";
import CategoryButtons from "@/components/CategoryButtons/CategoryButtons";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";

import { useState, useEffect } from "react";

export default function Page() {
  const [latest, setLatest] = useState([]);
  const [categorySong, setCategorySong] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const [latestSongs, initialCategorySongs, categoryList] =
        await Promise.all([
          FetchData(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song?latest=1&limit=5`
          ),
          FetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song?limit=5`),
          FetchData(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category`),
        ]);

      setLatest(latestSongs.data);
      setCategorySong(initialCategorySongs.data);
      setCategories(categoryList.map((cat) => cat.category));
    };

    fetchInitialData();
  }, []);

  const handleCategorySelect = async (category) => {
    setCategorySelected(category);
    try {
      const categoryURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song?category=${category}&limit=5`;
      const categorySongs = await FetchData(categoryURL);
      setCategorySong(categorySongs.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  return (
    <div className="mb-16 min-h-screen">
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
        <Header title="New Music" />
        <CardList data={latest} />
      </div>
      <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
        <Header title={`Category ${categorySelected}`} />
        <CategoryButtons
          categories={categories}
          handle={handleCategorySelect}
        />
        <CardList data={categorySong} />
      </div>
    </div>
  );
}
