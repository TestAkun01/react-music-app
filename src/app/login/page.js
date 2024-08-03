"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import githubLogo from "/public/Github_logo.png";
import googleLogo from "/public/Google_logo.png";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) setMessage(msg);
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="p-8 bg-gray-900 shadow-lg rounded-lg w-[370px] h-[500px]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>
        {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
        <hr className="h-px my-8 bg-gray-700 border-0" />
        <div className="flex flex-col space-y-4 w-full h-full">
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center py-1 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white"
          >
            <div className="w-8 h-8 mr-2 flex items-center justify-center">
              <Image
                src={githubLogo}
                alt="GitHub Logo"
                width={200}
                height={200}
                className="w-6 h-6"
              />
            </div>
            Login with GitHub
          </button>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center py-1 border border-gray-600 rounded-lg shadow-sm bg-white text-black"
          >
            <div className="w-8 h-8 mr-2">
              <Image
                src={googleLogo}
                alt="Google Logo"
                width={200}
                height={200}
                className="w-8 h-8"
              />
            </div>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
