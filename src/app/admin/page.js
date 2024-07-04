import AdminLayout from "@/components/AdminLayout";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      <p>This is where you can manage the application.</p>
    </AdminLayout>
  );
};

export default Page;
