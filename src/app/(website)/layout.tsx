import type React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/navbar';
// import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/context/auth-context';
import AppProvider from '@/components/provider/app-provider';
import { Toaster } from 'sonner';
import FooterComponent from '@/components/shared/FooterComponent';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Drip Swag - Corporate Gifting Solutions',
  description: 'Sustainable corporate gifts for a greener future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <AuthProvider>
          <div className="">
            <Navbar />
            <AppProvider>{children}</AppProvider>

            <Toaster />
            <FooterComponent />
          </div>
        </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
