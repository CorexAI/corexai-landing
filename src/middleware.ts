import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
  '/hook-generator',
  '/full-script-creator',
  '/dashboard',
  '/billing',
  '/payment',
  '/onboarding'
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is a protected page route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // For page routes, we'll let them load but add a header to indicate they need auth
    // The actual auth check will happen in the page component
    const response = NextResponse.next();
    response.headers.set('x-requires-auth', 'true');
    return response;
  }

  // Only protect API routes
  if (pathname.startsWith('/api/')) {
    // Skip authentication for non-protected routes
    if (pathname.startsWith('/api/auth/') || pathname.startsWith('/api/test-firebase-admin')) {
      return NextResponse.next();
    }

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid token' },
        { status: 401 }
      );
    }

    // For now, we'll validate the token structure
    // In the next step, we'll add Firebase token verification
    if (token.length < 10) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid token format' },
        { status: 401 }
      );
    }

    // Continue to the API route
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
