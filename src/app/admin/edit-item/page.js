"use client";
import AdminLayout from "@/components/AdminLayout";
import LayoutTable from "@/components/LayoutTable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  // Fungsi untuk memuat ulang data dari API
  const reloadData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song`
      );
      const newData = await response.json();
      const modifiedData = newData.map((item) => ({
        ...item,
        list: item.list.length,
      }));
      setData(modifiedData);
      console.log("Data refreshed:", modifiedData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };
  useEffect(() => {
    reloadData();
  }, []);
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Item</h1>
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
      <LayoutTable data={data}></LayoutTable>
    </AdminLayout>
  );
}
