"use client";

import Link from "next/link";
import React from "react";
import FetchData from "../FetchData/FetchData";

export default function LayoutTable({ data, reloadData, type }) {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleDelete = async (id) => {
    const confirmDelete = confirm(`Delete item with ID ${id}?`);
    if (confirmDelete) {
      try {
        const response = await FetchData(`api/${type}/${id}`, "", "DELETE");
        if (response) {
          reloadData();
        } else {
          throw new Error("Failed to delete album");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert(
          `Failed to delete ${
            type === "album" ? "album" : "track"
          }. Please try again.`
        );
      }
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-50  table-fixed">
        <thead className="text-xs text-gray-200 uppercase bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-2 py-2 w-[140px]">
                {column}
              </th>
            ))}
            <th scope="col" className="px-2 py-2 w-[140px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800 border-b border-gray-700">
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-2 py-2 w-[140px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {column === "track" ? row[column].length : row[column]}
                </td>
              ))}
              <td className="px-2 py-2 flex justify-between flex-wrap gap-y-2 w-[140px]">
                <Link
                  href={`/admin/${type}/${row._id}`}
                  className="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 font-medium rounded-full text-sm px-3 py-1"
                  aria-label={`edit ${row._id}`}
                >
                  Edit
                </Link>
                <button
                  className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm px-3 py-1"
                  onClick={() => handleDelete(row._id)}
                  aria-label={`delete ${row._id}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
