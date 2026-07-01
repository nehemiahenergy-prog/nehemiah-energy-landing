import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const paralucent = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Paralucent-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Paralucent-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Paralucent-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Nehemiah Energy | Powering Ghana's EV Future",
  description:
    "Drive. Charge. Earn. Nehemiah Energy is Ghana's premier EV charging app by Neh Power. Find stations, charge your vehicle, track usage, and earn rewards.",
  keywords: [
    "EV charging",
    "Ghana",
    "electric vehicle",
    "Neh Power",
    "Nehemiah Energy",
  ],
  openGraph: {
    title: "Nehemiah Energy | Powering Ghana's EV Future",
    description:
      "Drive. Charge. Earn. Ghana's premier EV charging app by Neh Power.",
    type: "website",
    url: "https://nehemiahenergy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${paralucent.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
