"use client";
import CardList from "@/components/CardList";
import FetchData from "@/components/FetchData/FetchData";
import Header from "@/components/Header/Header";
import PosterContent from "@/components/PosterContent/PosterContent";
import { useState, useEffect } from "react";

export default function Page() {
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryAlbums, setCategoryAlbums] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const [latestSongs, categoryList] = await Promise.all([
        FetchData(`api/album?limit=4`),
        FetchData(`api/category`),
      ]);

      setLatest(latestSongs.data);
      let filteredCategories = categoryList.filter(
        (cat) => cat.category !== "All"
      );
      filteredCategories = filteredCategories.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setCategories(filteredCategories);

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
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 max-w-max">
                <CardList data={latest} />
              </div>
              {categories.map((cat) => (
                <div key={cat._id}>
                  <Header title={cat.category} key={cat._id} />
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 max-w-max">
                    <CardList data={categoryAlbums[cat.category] || []} />
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-4">
              <PosterContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
