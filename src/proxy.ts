import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Next.js treats this file as a proxy in the latest version
export default withAuth(
  function proxy(req) {
    // Extract the user token containing the role
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Identify the path the user is attempting to access
    const isTryingToAccessAdmin = pathname.startsWith("/admin");
    const isTryingToAccessAuth =
      pathname.startsWith("/login") || pathname.startsWith("/register");

    // 1. Dashboard protection: Redirect if user is not an admin
    if (isTryingToAccessAdmin && token?.role !== "ADMIN") {
      // Redirect to home page
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Login/Register protection: Redirect if already logged in
    if (isTryingToAccessAuth && token) {
      // Redirect to home page
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. Proceed if authorized and apply cache control
    const response = NextResponse.next();

    // Force browser to disable cache (prevents issues with back button)
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname;

        // Allow access to login/register so the proxy function can handle the redirection logic
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
          return true;
        }

        // For other paths (e.g., admin), authentication is required
        return !!token;
      },
    },
  },
);

// Define paths for the proxy to monitor
export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
