import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SessionWrapper from './components/SessionWrapper'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me A Chai",
  description: "Get me a chai is a platform where fans can support their favorite creators by sending them a cup of chai (tea) and leaving a message of encouragement.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <SessionWrapper>
         <Navbar/>
         {children}
         <Footer/>
      </SessionWrapper>
        </body>
    </html>
  );
}
