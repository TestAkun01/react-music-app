"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import FetchData from "@/components/FetchData/FetchData";
import LayoutTable from "@/components/LayoutTable";
import { notFound } from "next/navigation";

export default function Page({ params }) {
  const { type } = params;
  const validTypes = ["album", "track", "artist"];

  if (!validTypes.includes(type)) {
    notFound();
  }

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    try {
      const newData = await FetchData(`api/${type}`, `limit=-1`);

      const data = newData.data ? newData.data : newData;

      const modifiedData = data.map((item) => {
        if (type === "album") {
          const artistName = Array.isArray(item.artist)
            ? item.artist.map((artist) => artist.artist).join(" & ")
            : item.artist;
          const category = Array.isArray(item.category)
            ? item.category.map((cat) => cat.category).join(", ")
            : item.category;
          return {
            ...item,
            category: category,
            artist: artistName,
          };
        } else if (type === "track") {
          const artistName = Array.isArray(item.artist)
            ? item.artist.map((artist) => artist.artist).join(" & ")
            : item.artist;
          return {
            ...item,
            artist: artistName,
          };
        } else if (type === "artist") {
          return item;
        }
      });
      setData(modifiedData);
      setFilteredData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-between mb-4 gap-8">
        <h1 className="text-2xl font-bold">
          {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </h1>
        <div className="mb-4 flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-4 px-2 w-full h-8 text-md text-black rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300"
          />
        </div>

        <div className="flex gap-4 items-start">
          <button
            onClick={getData}
            className="bg-blue-700 text-white px-6 py-2 rounded-full text-sm"
          >
            Refresh Data
          </button>
          <Link
            href={`/admin/add/${type}`}
            className="bg-blue-700 text-white px-6 py-2 rounded-full text-sm"
          >
            Add {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </Link>
        </div>
      </div>

      <LayoutTable data={filteredData} reloadData={getData} type={type} />
    </AdminLayout>
  );
}
