import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NextAuthProvider from './providers';

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
        <footer className='py-4'>footer</footer>
      </body>
    </html>
  );
}
