import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-950 pb-16">
      <main className="w-full max-w-screen-xl bg-gray-900 text-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex">
          <Link href="/admin">
            <p className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </p>
          </Link>
          <Link href="/admin/edit-item">
            <p className="block py-2 px-4 rounded hover:bg-gray-700">
              Edit Item
            </p>
          </Link>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
