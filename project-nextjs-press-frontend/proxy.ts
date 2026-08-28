import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  console.log("request", request);

  const pathname = request.nextUrl.pathname;

  console.log("pathname", pathname);
  console.log("Proxy");
  console.log("Url", request.url);
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/admin-dashboard/:path*",
    // "/author-dashboard/:path*",

    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
