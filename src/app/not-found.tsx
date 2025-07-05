import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  // Extract the current locale from the URL
  const pathParts = typeof window !== 'undefined' ? 
    window.location.pathname.split('/').filter(Boolean) : [];
  const currentLocale = pathParts[0] === 'ar' ? 'ar' : 'en';
  const isRTL = currentLocale === 'ar';

  return (
    <html dir={isRTL ? 'rtl' : 'ltr'} lang={currentLocale}>
      <body style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        color: '#212529'
      }}>
        <div style={{ maxWidth: '600px', padding: '2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#dc3545'
          }}>
            {isRTL ? '404 - الصفحة غير موجودة' : '404 - Page Not Found'}
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {isRTL 
              ? 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.'
              : 'Sorry, we couldn\'t find the page you\'re looking for.'}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f8f9fa',
                color: '#0d6efd',
                border: '1px solid #0d6efd',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              {isRTL ? 'العودة للخلف' : 'Go Back'}
            </button>
            
            <Link
              href={`/${currentLocale}`}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0d6efd',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              {isRTL ? 'العودة للصفحة الرئيسية' : 'Go to Homepage'}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
