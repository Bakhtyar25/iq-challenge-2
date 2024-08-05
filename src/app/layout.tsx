import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ubuntu = Ubuntu({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi step form",
  description: "Multi step form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(ubuntu.className, "")}>{children}</body>
    </html>
  );
}
