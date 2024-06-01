import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="text-white bg-slate-800 ">
          <Header />
          <div className=" min-h-screen max-w-screen-xl m-auto px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
