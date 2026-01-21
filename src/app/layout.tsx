import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SentinelStream",
  description: "Multimodal Video Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-blue-500/30`}
      >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar Component would be dynamically imported or directly used here. 
                 Since it is a client component, we might want to wrap it or just use it if allowed in this server component.
                 Wait, Sidebar is "use client", so it can be imported into a Server Component (RootLayout).
              */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pl-64 transition-all duration-300">
            <div className="container mx-auto p-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
