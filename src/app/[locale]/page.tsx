'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('HomePage');
  const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center sm:text-left w-full" dir={isRTL ? 'rtl' : 'ltr'}>
          {t('welcome')}
        </h1>
        <p className="text-lg text-center sm:text-left w-full" dir={isRTL ? 'rtl' : 'ltr'}>
          {t('description')}
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row w-full mt-4">
          <Link
            href="/dashboard"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[180px] text-center"
          >
            {t('goToDashboard')}
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[180px] text-center"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('readDocs')}
          </a>
        </div>
      </main>
    </div>
  );
}

