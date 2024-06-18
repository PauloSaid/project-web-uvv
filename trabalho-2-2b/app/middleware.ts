import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';

export function middleware(req: NextRequest) {
  const cookies = parseCookies({ req });
  const token = cookies['auth.token'];

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/books/:path*', '/add-book/:path*', '/edit-book/:id'],
};
