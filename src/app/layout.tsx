import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppContent from "@/components/AppContent";

export const metadata: Metadata = {
  title: "NextBlogger",
  description: "A simple blog built with Next.js and Node backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <AppContent>{children}</AppContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
