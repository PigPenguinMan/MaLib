import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/navbar";
import Providers from "./components/sessionprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <header className="header sticky top-0 z-[100] bg-white">
          <NavBar />
        </header>
          {children}
          </Providers>
      </body>
    </html>
  );
}
