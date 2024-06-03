// _middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/profile']; // Define your protected routes here

export async function middleware(req) {
  // Implement your authentication check here
  // For demonstration, we assume a simple check based on a hypothetical `user` property in the request
  const user = req.cookies.user; // Example: Check for a user cookie

  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to login page if not authenticated and trying to access a protected route
    return NextResponse.redirect('/login');
  }

  // Allow the request to proceed if authenticated or not trying to access a protected route
  return NextResponse.next();
}
