import AdminLayout from "@/components/AdminLayout";
import EditItems from "@/components/AdminLayout/EditItems/EditItems";
import React from "react";

export default function Page({ params }) {
  const { id } = params;
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <EditItems id={id}></EditItems>
    </AdminLayout>
  );
}
