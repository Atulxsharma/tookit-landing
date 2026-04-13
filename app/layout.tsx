import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

const title = 'Tookit — Know they took it. Without asking.';
const description =
  'The medication tracker for caregivers and families. See when doses are taken — without the daily call. Join the waitlist.';

export const metadata: Metadata = {
  metadataBase: new URL('https://tookit-landing.vercel.app'),
  title,
  description,
  alternates: {
    canonical: 'https://tookit-landing.vercel.app'
  },
  openGraph: {
    title,
    description,
    url: 'https://tookit-landing.vercel.app',
    siteName: 'Tookit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tookit — Know they took it. Without asking.'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png']
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <Script id="gtag-stub" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
