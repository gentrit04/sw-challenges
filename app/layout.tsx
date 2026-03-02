import type { Metadata } from 'next';
import { Saira } from 'next/font/google';
import './globals.css';

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
      <body className={`${saira.className}  antialiased`}>{children}</body>
    </html>
  );
}
