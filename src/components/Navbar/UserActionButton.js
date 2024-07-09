import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function UserActionButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="text-white hover:text-gray-400 flex items-center space-x-2"
      >
        <span className="text-white whitespace-nonwrap hover:text-gray-400">
          Log out
        </span>
      </button>
    );
  } else {
    return (
      <Link
        href="/login"
        className="text-white whitespace-nonwrap hover:text-gray-400"
      >
        Sign In
      </Link>
    );
  }
}
