import type { Metadata } from 'next';

import Provider from '@/components/provider/Provider';
import { inter } from '@/src/config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Home - Teslo Shop ',
    template: '%s | Teslo Shop'
  },
  description: 'Ecommerce app created with Next.js'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
