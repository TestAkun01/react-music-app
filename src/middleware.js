import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.userRole !== "admin") {
      const url = new URL("/login", req.url);
      url.searchParams.set(
        "message",
        "You must be logged in to access the admin panel"
      );
      return NextResponse.redirect(url);
    }
  }
  if (req.nextUrl.pathname.startsWith("/user")) {
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set(
        "message",
        "You must be logged in to access the user dashboard"
      );
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
