import AdminLayout from "@/components/AdminLayout";
import AddItems from "@/components/AdminLayout/AddItems/AddItems";
import React from "react";

export default function Page({ params }) {
  const { type } = params;
  return (
    <div className="mb-16 min-h-screen">
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        <AddItems type={type} />
      </AdminLayout>
    </div>
  );
}
