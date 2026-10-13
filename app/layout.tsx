import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Public_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tech Solution Nepal — Enterprise IT Solutions & CMS Platform',
  description:
    'Full-service technology consultancy and enterprise CMS platform delivering custom web engineering, mobile apps, cloud infrastructure, AI systems, cybersecurity, and digital growth from Kathmandu, Nepal to global enterprises.',
  openGraph: {
    title: 'Tech Solution Nepal — Enterprise IT Solutions & CMS Platform',
    description:
      'Full-service technology consultancy and enterprise CMS platform delivering custom web engineering, mobile apps, cloud infrastructure, AI systems, cybersecurity, and digital growth from Kathmandu, Nepal to global enterprises.',
    type: 'website',
    siteName: 'Tech Solution Nepal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Solution Nepal — Enterprise IT Solutions & CMS Platform',
    description:
      'Full-service technology consultancy and enterprise CMS platform delivering custom web engineering, mobile apps, cloud infrastructure, AI systems, cybersecurity, and digital growth.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tech Solution Nepal',
    legalName: 'Tech Solution Nepal Pvt. Ltd.',
    url: process.env.APP_URL || 'https://techsolutionnepal.com',
    foundingDate: '2018',
    description:
      'Full-service enterprise technology consultancy delivering web platforms, mobile apps, desktop software, AI/RAG systems, cloud DevOps, cybersecurity, data analytics, and digital growth from Kathmandu to global clients.',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Technology Corridor, Baneshwor / Tinkune',
        addressLocality: 'Kathmandu',
        postalCode: '44600',
        addressCountry: 'NP',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '285 Fulton Street, Suite 6400',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10007',
        addressCountry: 'US',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-1-4429810',
      contactType: 'sales',
      email: 'contact@techsolutionnepal.com',
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-700 selection:text-white"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-lg focus:text-xs focus:font-semibold"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
