"use client";
import AdminLayout from "@/components/AdminLayout";
import FetchData from "@/components/FetchData/FetchData";
import LayoutTable from "@/components/LayoutTable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  const reloadData = async () => {
    const newData = await FetchData(`api/album`, `limit=-1`);

    const modifiedData = newData.data.map((item) => ({
      ...item,
    }));
    setData(modifiedData);
  };

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Item</h1>
        <div className="flex gap-4 my-4">
          <button
            onClick={reloadData}
            className="bg-blue-500 text-white px-10 py-1 rounded-full"
          >
            Refresh Data
          </button>
          <Link
            href="/admin/add-item"
            className="block bg-blue-500 text-white px-10 py-1 rounded-full "
          >
            Add Item
          </Link>
        </div>
      </div>
      <LayoutTable data={data} reloadData={reloadData}></LayoutTable>
    </AdminLayout>
  );
}
