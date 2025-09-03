import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that should show the sidebar
  const isOnboardingPath = path.startsWith("/onboarding")

  // Add a custom header to indicate if this is an onboarding path
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-is-onboarding", isOnboardingPath ? "true" : "false")

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
