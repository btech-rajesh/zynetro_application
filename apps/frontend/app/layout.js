import "./globals.css";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Zynetra | Premium Digital Services",
  description:
    "Zynetra helps businesses scale with web development, backend systems, AI automation, and intelligent service delivery."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-950 antialiased">
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
