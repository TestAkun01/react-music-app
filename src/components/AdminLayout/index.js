import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li>
              <Link href="/admin/add-item">
                <p className="block py-2 px-4 rounded hover:bg-gray-700">
                  Add Item
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
