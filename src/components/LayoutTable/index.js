"use client";

import Link from "next/link";
import React from "react";

export default function LayoutTable({ data }) {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleDelete = (id) => {
    confirm(`Delete ${id} ?`);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/song/${id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-2 py-2">
                {column}
              </th>
            ))}
            <th scope="col" className="px-2 py-2">
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
                  className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {row[column]}
                </td>
              ))}
              <td className="px-2 py-2 flex justify-between flex-wrap gap-y-2">
                <Link
                  href={`/admin/edit-item/${row._id}`}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-3 py-1"
                >
                  Edit
                </Link>
                <button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-3 py-1"
                  onClick={() => handleDelete(row._id)}
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
