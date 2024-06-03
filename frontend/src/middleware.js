import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookies = req.headers.get('cookie') ? parse(req.headers.get('cookie')) : {};
  const token = cookies.authToken;

  console.log('Token:', token); // Debugging line

  if (/\/_next\//.test(pathname)) {
    return NextResponse.next();
  }

  const publicPaths = ['/register', '/'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const baseUrl = req.nextUrl.origin;
  const loginPageUrl = new URL('/login', baseUrl);

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(loginPageUrl);
  }

  return NextResponse.next();
}
