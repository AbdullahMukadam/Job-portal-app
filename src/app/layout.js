import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

import CommonLayout from "@/common-layout";
import SkeletonDemo from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/assets/logo-job.jpg',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}

        >
          <div className="min-h-screen flex flex-col items-center">
            <main className="w-full max-w-7xl mx-auto">
              <Suspense fallback={<SkeletonDemo />}>
                <CommonLayout>
                  {children}
                </CommonLayout>
              </Suspense>
            </main>
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}
