import './globals.css';
import { Providers } from './providers';
import Layout from '@/containers/layout';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

const iransansx = localFont({
  src: '../public/fonts/iransansx/IRANSansXV.woff2',
  variable: '--font-iransans',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'دیجی کالا',
  description: 'توسعه دهنده : حمید شاهسونی',
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl">
      <body className={iransansx.className}>
        <Providers>
          <Layout>{props.children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
