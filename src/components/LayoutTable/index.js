"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import FetchData from "../FetchData/FetchData";
import PaginationButton from "../PaginationButton/PaginationButton";

export default function LayoutTable({ data, reloadData, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setCurrentPage(1);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [data, currentPage]);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleDelete = async (id) => {
    const confirmDelete = confirm(`Delete item with ID ${id}?`);
    if (confirmDelete) {
      try {
        const response = await FetchData(`api/${type}/${id}`, "", "DELETE");
        if (response) {
          reloadData();
        } else {
          throw new Error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert(`Failed to delete ${type}. Please try again.`);
      }
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-50 table-fixed">
          <thead className="text-xs text-gray-200 uppercase bg-gray-700">
            <tr>
              {data.length === 0 ? (
                <th className="px-2 py-2">Tabel</th>
              ) : (
                <>
                  {columns.map((column, index) => (
                    <th key={index} scope="col" className="px-2 py-2 w-[140px]">
                      {column}
                    </th>
                  ))}
                  <th scope="col" className="px-2 py-2 w-[140px]">
                    Actions
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr className="bg-gray-800 border-gray-700">
                <td
                  colSpan={columns.length + 1}
                  className="px-2 py-2 text-center"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              currentItems.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-gray-800 border-b border-gray-700"
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="px-2 py-2 w-[140px] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {column === "track" ? row[column].length : row[column]}
                    </td>
                  ))}
                  <td className="px-2 py-2 flex justify-between items-center space-x-2 w-[140px]">
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
