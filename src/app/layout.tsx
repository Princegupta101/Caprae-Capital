import type { Metadata } from "next";
import { Inter } from 'next/font/google';

import { Providers } from './providers';

import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Caprae Capital - Business Acquisition Platform",
  description: "Connect business sellers and buyers through our innovative acquisition platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
