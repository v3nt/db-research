import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NextAuthProvider from './providers';
import Link from 'next/link';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Tech Test',
  description: 'Countries API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} mx-6 antialiased`}
      >
        <NextAuthProvider>
          <div className='mx-auto w-full max-w-screen-2xl'>
            <main className=''>{children}</main>
          </div>
        </NextAuthProvider>
        <footer className='mt-12 border-t-2 py-4 text-sm'>
          <p>
            Tech test using{' '}
            <Link href='https://restcountries.com'>
              https://restcountries.com
            </Link>{' '}
            and{' '}
            <Link href='https://www.ag-grid.com'>https://www.ag-grid.com</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
