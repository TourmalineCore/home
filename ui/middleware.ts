import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Necessary for the correct working of the click map and links map
// https://yandex.ru/support/metrica/ru/behavior/click-map#iframe
// eslint-disable-next-line no-useless-escape
const ALLOWED_REFERER_REGEX = /^https?:\/\/([^\/]+\.)?(tourmalinecore\.com|webvisor\.com|metri[ck]a\.yandex\.(com|ru|by|com\.tr))\//;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const referer = request.headers.get(`referer`);

  // Add a security header only when the Referer does not belong to a trusted domain
  if (!referer || !ALLOWED_REFERER_REGEX.test(referer)) {
    response.headers.set(`X-Frame-Options`, `SAMEORIGIN`);
  }

  return response;
}

export const config = {
  // Apply the middleware to everything except Next.js API routes and static assets
  matcher: `/((?!api|_next/static|_next/image|favicon.ico).*)`,
};
