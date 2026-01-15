import { NextRequest, NextResponse } from "next/server"
import type { NextURL } from "next/dist/server/web/next-url"

const PUBLIC_PATHS = ["/", "/login"]
const API_PATHS = ["/api"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value
  const { pathname } = request.nextUrl

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  // Protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  // API routes - optional token validation
  if (pathname.startsWith("/api")) {
    // Add token to all API requests
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-forwarded-auth", token || "")
    
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    
    if (token) {
      response.cookies.set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}


// // Add to your existing middleware
// import rateLimit from 'next-rate-limit'

// const limiter = rateLimit({
//   interval: 60 * 1000, // 1 minute
//   max: 100, // 100 requests per minute
// })

// // In middleware handler:
// const rateLimitRes = await limiter(request)
// if (!rateLimitRes.ok) {
//   return new Response('Too many requests', { status: 429 })
// }