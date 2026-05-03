import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | CLAIRE',
  description: 'The page you are looking for does not exist. Return to CLAIRE for academic, creative & development services.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: '#fff',
      fontFamily: 'var(--font-inter, sans-serif)',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '8rem', fontWeight: 900, margin: 0, lineHeight: 1, color: '#c9a84c' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 400, margin: '1rem 0', color: '#ccc' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#888', maxWidth: '400px', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" style={{
        background: '#c9a84c',
        color: '#000',
        padding: '0.75rem 2rem',
        borderRadius: '6px',
        fontWeight: 700,
        textDecoration: 'none',
        fontSize: '1rem',
      }}>
        Back to Home
      </Link>
    </div>
  );
}
