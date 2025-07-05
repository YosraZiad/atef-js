import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar'] as const;
const defaultLocale = 'en';
const publicRoutes = ['/login', '/register'];

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public files and Next.js internal routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(.*)$/) ||
    publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
  ) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If locale is already in the pathname, use the intl middleware
  if (pathnameHasLocale) {
    return intlMiddleware(request);
  }

  // Get the user's preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let userLocale = defaultLocale;
  
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLocale as any)) {
      userLocale = preferredLocale as typeof defaultLocale;
    }
  }

  // Create the new URL with the locale
  const newUrl = new URL(
    pathname === '/' ? `/${userLocale}` : `/${userLocale}${pathname}`,
    request.url
  );

  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except those that should be excluded
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};

