import AdminLayout from "@/components/AdminLayout";
import AddItems from "@/components/AdminLayout/AddItems";
import React from "react";

export default function Page() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <AddItems></AddItems>
    </AdminLayout>
  );
}
