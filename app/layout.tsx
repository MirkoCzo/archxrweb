import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./_layout/Navbar";
import Footer from "./_layout/Footer";

const roboto = Roboto({ weight:"700",subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArchXR",
  description: "Site pour le projet ARchXR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${roboto.className} flex flex-col min-h-screen pt-40`}>        
        <Navbar/>
          <main className="flex-grow">
            {children}
          </main>
        <Footer/>
        </body>
    </html>
  );
}