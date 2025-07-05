import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure webpack
  webpack: (config) => {
    // Add file-loader for JSON files
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  
  // Add i18n configuration
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

export default withNextIntl(nextConfig);
