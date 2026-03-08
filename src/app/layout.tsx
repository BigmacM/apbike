import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Bike Center Pattaya | Premium Motorbike Rentals – No Passport Deposit",
  description:
    "Rent motorbikes in Pattaya with zero hassle. No passport deposit required — copy & cash only. Honda Click, PCX 160, Forza 350 & more. Free helmets, 24h roadside assistance. Second Road, between Soi 8 & 9.",
  keywords: [
    "motorbike rental Pattaya",
    "scooter rental Pattaya",
    "Honda PCX Pattaya",
    "no passport deposit bike rental",
    "AP Bike Center",
    "All Pattaya bike",
  ],
  openGraph: {
    title: "AP Bike Center Pattaya | Premium Motorbike Rentals",
    description:
      "Explore Pattaya on two wheels. No passport deposit. Free helmets. 24h roadside assistance.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
