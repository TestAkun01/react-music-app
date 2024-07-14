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
          FetchData(`api/album`, `latest=1&limit=5`),
          FetchData(`api/album`, `limit=5`),
          FetchData(`api/category`),
        ]);

      setLatest(latestSongs.data);
      setCategorySong(initialCategorySongs.data);
      setCategories(categoryList.map((cat) => cat.category));
    };

    fetchInitialData();
  }, []);

  const handleCategorySelect = async (category) => {
    setCategorySelected(category);

    const categorySongs = await FetchData(
      "api/album",
      `category=${category}&limit=5`
    );
    setCategorySong(categorySongs.data);
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
