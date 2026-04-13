import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tookit — Know they took it. Without asking.',
  description:
    'The medication tracker that tells caregivers and families when doses are taken. No more daily calls. No more guessing. Join the waitlist.',
  metadataBase: new URL('https://usetookit.com'),
  openGraph: {
    title: 'Tookit — Know they took it. Without asking.',
    description:
      'The medication tracker that tells caregivers and families when doses are taken. No more daily calls. No more guessing. Join the waitlist.',
    images: ['/og.png'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tookit — Know they took it. Without asking.',
    description:
      'The medication tracker that tells caregivers and families when doses are taken. No more daily calls. No more guessing. Join the waitlist.',
    images: ['/og.png']
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
