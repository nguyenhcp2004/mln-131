import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-crimson-text"
});

export const metadata: Metadata = {
  title: "Quyền con người trong Chủ Nghĩa Xã Hội",
  description: "Nội dung được tạo và hoàn thiện bởi nhóm 4"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
