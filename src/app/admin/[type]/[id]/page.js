import AdminLayout from "@/components/AdminLayout";
import EditItems from "@/components/AdminLayout/EditItems/EditItems";
import React from "react";

export default function Page({ params }) {
  const { id, type } = params;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Edit {type}</h1>
      <EditItems id={id} type={type}></EditItems>
    </AdminLayout>
  );
}
