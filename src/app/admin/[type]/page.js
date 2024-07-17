"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import FetchData from "@/components/FetchData/FetchData";
import LayoutTable from "@/components/LayoutTable";

export default function Page({ params }) {
  const { type } = params;
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const newData = await FetchData(`api/${type}`, `limit=-1`);
      const data = newData.data ? newData.data : newData;
      const modifiedData = data.map((item) => {
        const artistName = Array.isArray(item.artist)
          ? item.artist.map((artist) => artist.artist).join(" & ")
          : item.artist;
        if (type === "album") {
          const category = Array.isArray(item.category)
            ? item.category.map((cat) => cat.category).join(", ")
            : item.category;
          return {
            ...item,
            category: category,
            artist: artistName,
          };
        } else if (type === "track") {
          return {
            ...item,
            artist: artistName,
          };
        }
      });
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [type]);

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </h1>
        <div className="flex gap-4 my-4">
          <button
            onClick={getData}
            className="bg-blue-500 text-white px-10 py-1 rounded-full"
          >
            Refresh Data
          </button>
          <Link
            href={`/admin/add-item`}
            className="block bg-blue-500 text-white px-10 py-1 rounded-full"
          >
            Add {type?.charAt(0).toUpperCase() + type?.slice(1)}
          </Link>
        </div>
      </div>
      <LayoutTable data={data} reloadData={getData} type={type}></LayoutTable>
    </AdminLayout>
  );
}
