import { NextResponse } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/products', '/cart', '/login']

// Protected routes that require authentication
const protectedRoutes = ['/profile', '/profile/which-env']

// Routes that should redirect to home if user is already authenticated
const authRoutes = ['/login']

// Helper function to verify auth token
function verifyAuthToken(request) {
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    return null
  }

  try {
    // Simple token verification (decode base64)
    const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString())
    return decodedToken
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Skip middleware for static files, Next.js internals, and non-auth API routes
  if (
    pathname.startsWith('/_next') ||
    (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Verify auth token
  const user = verifyAuthToken(request)

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))

  // Check if route is auth route (login)
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  // If user is authenticated and trying to access auth routes, redirect to profile
  if (user && isAuthRoute) {
    url.pathname = '/profile'
    return NextResponse.redirect(url)
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!user && isProtectedRoute) {
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // For public routes, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For all other routes, continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
