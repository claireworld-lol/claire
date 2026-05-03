import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const SITE_URL = 'https://www.claireworld.lol';
import Script from 'next/script';
import { FirebaseProvider } from '../components/FirebaseProvider';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CLAIRE — Academic, Creative & Development Services | Vadodara',
    template: '%s | CLAIRE',
  },
  description: 'Premium academic writing, graphic design, website development & project solutions in Vadodara, Gujarat. PPT presentations, assignments, research papers, eBooks, engineering projects & more. Trusted by 500+ clients.',
  keywords: ['academic services Vadodara', 'assignment help India', 'website development Gujarat', 'PPT presentation service', 'research paper writing', 'engineering project help', 'graphic design services', 'college project assistance'],
  authors: [{ name: 'CLAIRE' }],
  creator: 'CLAIRE',
  publisher: 'CLAIRE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'CLAIRE — Where Ideas Meet Precision & Elegance',
    description: 'Premium academic, creative & development solutions powered by AI & human expertise. Trusted by 500+ clients in Vadodara.',
    url: SITE_URL,
    siteName: 'CLAIRE',
    images: [{ url: '/claire_logo.jpg', width: 1024, height: 1024, alt: 'CLAIRE — Academic & Creative Services Logo' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAIRE — Academic, Creative & Development Services',
    description: 'Premium solutions for students, professors & businesses. Trusted by 500+ clients.',
    images: ['/claire_logo.jpg'],
  },
  icons: {
    icon: '/claire_logo.jpg',
    apple: '/claire_logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: '_sLhdVVk-HhjX5ZsSGWE7avGD_L27VnM_1NlEEp9z9s',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>

        <Analytics />
        <SpeedInsights />

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
