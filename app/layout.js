import { Inter } from "next/font/google";
import "./globals.css";
import "./fontawesome-free-6.4.0-web/css/all.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "../components/react/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E store",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-10`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
