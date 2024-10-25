import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex bg-gray-950 pb-16">
      <div className="text-white md:p-8 p-4 pt-8 w-[180px] flex-shrink-0">
        <h1 className="md:text-2xl text-xl font-bold mb-4">Admin Panel</h1>
        <Link href="/admin">
          <p className="block py-2 px-4 md:text-base text-sm rounded hover:bg-gray-700">
            Dashboard
          </p>
        </Link>
        <Link href="/admin/album">
          <p className="block py-2 px-4 md:text-base text-sm rounded hover:bg-gray-700">
            Album
          </p>
        </Link>
        <Link href="/admin/track">
          <p className="block py-2 px-4 md:text-base text-sm rounded hover:bg-gray-700">
            Track
          </p>
        </Link>
        <Link href="/admin/artist">
          <p className="block py-2 px-4 md:text-base text-sm rounded hover:bg-gray-700">
            Artist
          </p>
        </Link>
      </div>
      <div className="border-l border-gray-700"></div>
      <div className="flex-1 overflow-auto text-white p-8">{children}</div>
    </div>
  );
}
