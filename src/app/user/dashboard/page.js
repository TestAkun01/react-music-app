"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session);
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto p-4 w-full min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {session && (
        <div>
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={200}
            height={200}
            className="w-32 h-32 rounded-[50%]"
          ></Image>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
        </div>
      )}
      {!session && (
        <p>You are not logged in. Please log in to access the dashboard.</p>
      )}
    </div>
  );
}
