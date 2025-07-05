import { redirect } from 'next/navigation';

export default function Home() {
  // This is a fallback in case the middleware doesn't handle the redirect
  // The middleware should handle the actual redirection
  redirect('/en');
}

export const dynamic = 'force-dynamic';

// This tells Next.js to never cache this page
export const revalidate = 0;
