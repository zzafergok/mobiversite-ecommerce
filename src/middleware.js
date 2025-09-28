import { NextResponse } from 'next/server'

// Public routes that don't require authentication (currently handled by specific matcher)
// const publicRoutes = ['/', '/products', '/cart', '/login', '/register', '/cookie-policy']

// Protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/profile/which-env',
  '/profile/edit',
  '/profile/orders',
  '/profile/wishlist',
  '/profile/lists',
]

// Routes that should redirect to home if user is already authenticated
const authRoutes = ['/login', '/register']

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

  // Skip middleware for static files, Next.js internals, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // Skip files with extensions
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Verify auth token
  const user = verifyAuthToken(request)

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))

  // Check if route is auth route (login/register)
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

  // Allow all other routes (including public routes)
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/register'],
}
