import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen mx-auto flex flex-col justify-center items-center">
      <h1 className="text-neutral-50 text-[150px]">404</h1>
      <div>
        <Link href={"/"} className="text-blue-600 text-[35px]">
          Back To Home
        </Link>
      </div>
    </div>
  );
}
