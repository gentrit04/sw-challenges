import type { Metadata } from 'next';
import { Saira } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const saira = Saira({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SW | CHALLENGES',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${saira.className}  antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
