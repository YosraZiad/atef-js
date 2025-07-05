'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const pathname = usePathname();
  const [isRTL, setIsRTL] = useState(false);
  
  // Extract the current locale from the URL
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const currentLocale = pathParts[0] === 'ar' ? 'ar' : 'en';
    setIsRTL(currentLocale === 'ar');
    
    // Set document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;
  }, [pathname, isRTL]);

  const containerStyle = {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    margin: 0,
    padding: '1rem',
    textAlign: 'center' as const,
    backgroundColor: '#f8f9fa',
    color: '#212529'
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#dc3545'
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    lineHeight: '1.6'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f8f9fa',
    color: '#0d6efd',
    border: '1px solid #0d6efd',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.2s',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0d6efd',
    color: 'white',
    border: 'none',
    textDecoration: 'none',
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.opacity = '0.9';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '600px', padding: '2rem' }}>
        <h1 style={headingStyle}>
          {isRTL ? '404 - الصفحة غير موجودة' : '404 - Page Not Found'}
        </h1>
        
        <p style={paragraphStyle}>
          {isRTL 
            ? 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.'
            : 'Sorry, we couldn\'t find the page you\'re looking for.'}
        </p>
        
        <div style={buttonContainerStyle}>
          <button
            onClick={() => window.history.back()}
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {isRTL ? 'العودة للخلف' : 'Go Back'}
          </button>
          
          <Link
            href={isRTL ? '/ar' : '/en'}
            style={primaryButtonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {isRTL ? 'العودة للصفحة الرئيسية' : 'Go to Homepage'}
          </Link>
        </div>
      </div>
    </div>
  );
}
