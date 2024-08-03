import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-950 pb-16">
      <div className="text-white p-8 w-max">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <Link href="/admin">
          <p className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</p>
        </Link>
        <Link href="/admin/album">
          <p className="block py-2 px-4 rounded hover:bg-gray-700">Album</p>
        </Link>
        <Link href="/admin/track">
          <p className="block py-2 px-4 rounded hover:bg-gray-700">Track</p>
        </Link>
        <Link href="/admin/artist">
          <p className="block py-2 px-4 rounded hover:bg-gray-700">Artist</p>
        </Link>
      </div>
      <div className="border-l border-gray-700"></div>
      <main className="flex-1 text-white p-8">{children}</main>
    </div>
  );
}
