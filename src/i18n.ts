import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';
import fs from 'fs';
import { ReactNode } from 'react';

const locales = ['en', 'ar'] as const;

type Locale = typeof locales[number];

// Type guard to check if a string is a valid locale
function isValidLocale(locale: string | undefined): locale is Locale {
  return typeof locale === 'string' && (locales as readonly string[]).includes(locale);
}

export default getRequestConfig(async ({ locale }) => {
  // Resolve locale: fallback to 'en' if undefined or invalid
  const resolvedLocale: Locale = isValidLocale(locale) ? locale as Locale : 'en';
  // Validate the incoming `locale` parameter
  // We no longer throw for invalid locale; we fallback instead

  try {
    // Construct the path to the messages file
    const messagesPath = path.join(process.cwd(), 'messages', `${resolvedLocale}.json`);
    
    // Check if the file exists
    if (!fs.existsSync(messagesPath)) {
      console.error(`Messages file not found for locale: ${locale} at path: ${messagesPath}`);
      notFound();
    }
    
    // Read the messages file directly
    const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8')) as Record<string, any>;
    
    if (!messages) {
      console.error(`Failed to load messages for locale: ${locale}`);
      notFound();
    }
    
    // Simple type for translation values
    const translationValue = (chunks: ReactNode) => chunks;
    
    return {
      locale: resolvedLocale,
      messages,
      // Add default translation values
      defaultTranslationValues: {
        strong: translationValue,
        em: translationValue,
      },
      // Enable error tracking
      onError: (error: Error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Translation error:', error);
        }
      },
      // Enable missing translations logging in development
      getMessageFallback: (params: { namespace?: string; key?: string; error?: Error }) => {
        const { namespace, key } = params;
        const path = [namespace, key].filter((part) => part != null).join('.');
        
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Missing translation: ${path}`);
        }
        
        return path;
      },
    };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    notFound();
  }
});