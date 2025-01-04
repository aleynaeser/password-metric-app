import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import '@styles/globals.scss';

const plusJakartaFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Password Metric',
  description: 'Password Strength and User Tendencies',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={plusJakartaFont.className}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#f9f9f9' />
        <link rel='shortcut icon' href='/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#f9f9f9' />
        <meta name='msapplication-config' content='/favicons/browserconfig.xml' />
        <meta name='theme-color' content='#f9f9f9' />
      </head>

      <body className={`h-screen bg-[var(--background)] text-sm text-[var(--primary)]`}>{children}</body>
    </html>
  );
}
