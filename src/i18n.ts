import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always a string from the allowed list
  if (typeof locale !== 'string' || !locales.includes(locale)) notFound();

  return {
    locale, // Now always a string
    messages: (await import(`../messages/${locale}.json`)).default
  };
});