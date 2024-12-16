import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/header";
import { ToasterComponent } from "@/components/toaster/toaster";
import AuthContextProvider from "../helpers/context/AuthContext";
import Footer from "@/components/shared/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venture Buddy",
  description: "Generated by Venture Buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <main className="bg-cyan-50/70 text-gray-700">
            <ToasterComponent />
            <Header />
            <div className=" min-h-screen">{children}</div>
            <Footer />
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
