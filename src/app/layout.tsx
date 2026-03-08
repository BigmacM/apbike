import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://apbikecenter.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AP Bike Center Pattaya | Motorbike Rentals — No Passport Deposit",
    template: "%s | AP Bike Center Pattaya",
  },
  description:
    "Rent a motorbike in Pattaya with no passport deposit. Honda Click 125i from ฿220/day, PCX 160, Forza 350, Yamaha NMAX & more. Free helmets, 24-hour roadside assistance. Second Road, Soi 8–9.",
  keywords: [
    "motorbike rental Pattaya",
    "scooter rental Pattaya",
    "no passport deposit bike rental",
    "Honda PCX 160 Pattaya",
    "Honda Click 125i rental",
    "Honda Forza 350 Pattaya",
    "Yamaha NMAX rental",
    "AP Bike Center",
    "All Pattaya bike rental",
    "cheap motorbike Pattaya",
  ],
  authors: [{ name: "AP Bike Center" }],
  creator: "AP Bike Center",
  publisher: "AP Bike Center",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "AP Bike Center Pattaya | Motorbike Rentals — No Passport Deposit",
    description:
      "Explore Pattaya on two wheels. No passport deposit — ID copy & cash only. Free helmets, 24h roadside assistance. From ฿220/day.",
    url: SITE_URL,
    siteName: "AP Bike Center Pattaya",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "AP Bike Center Pattaya — Premium Motorbike Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AP Bike Center Pattaya | No Passport Deposit Bike Rentals",
    description:
      "From ฿220/day. Bring an ID copy & cash. Free helmet included. 24h roadside backup. Book online.",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=85",
    ],
  },
};

// JSON-LD structured data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "@id": `${SITE_URL}/#business`,
  name: "AP Bike Center Pattaya",
  alternateName: "All Pattaya Bike Center",
  description:
    "Premium motorbike and scooter rentals in Pattaya. No passport deposit — ID copy and cash only. Free helmets included. 24-hour roadside assistance.",
  url: SITE_URL,
  image:
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=85",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Second Road, between Soi 8 and Soi 9",
    addressLocality: "Pattaya",
    addressRegion: "Chonburi",
    postalCode: "20150",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.934,
    longitude: 100.888,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "18:59",
    },
  ],
  currenciesAccepted: "THB",
  paymentAccepted: "Cash",
  priceRange: "฿฿",
  areaServed: {
    "@type": "City",
    name: "Pattaya",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "100",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Motorbike Rental Fleet",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Honda Click 125i Rental",
        price: "250",
        priceCurrency: "THB",
        unitText: "DAY",
      },
      {
        "@type": "Offer",
        name: "Honda Scoopy Rental",
        price: "220",
        priceCurrency: "THB",
        unitText: "DAY",
      },
      {
        "@type": "Offer",
        name: "Honda PCX 160 Rental",
        price: "380",
        priceCurrency: "THB",
        unitText: "DAY",
      },
      {
        "@type": "Offer",
        name: "Yamaha NMAX Rental",
        price: "370",
        priceCurrency: "THB",
        unitText: "DAY",
      },
      {
        "@type": "Offer",
        name: "Honda Forza 350 Rental",
        price: "650",
        priceCurrency: "THB",
        unitText: "DAY",
      },
      {
        "@type": "Offer",
        name: "Yamaha XMAX Rental",
        price: "600",
        priceCurrency: "THB",
        unitText: "DAY",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to leave my passport as a deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. AP Bike Center never holds your passport. We only require a photocopy of your passport or ID plus a refundable cash deposit.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the motorbike rental price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every rental includes a free helmet. Pricing is per day with no hidden fees. Optional add-ons such as a guaranteed specific model are available.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the bike breaks down?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide 24-hour roadside assistance, 365 days a year. Contact us via LINE and we will come to you wherever you are in Pattaya.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to rent a motorbike in Pattaya at AP Bike Center?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prices start from ฿220/day for the Honda Scoopy. The Honda Click 125i is ฿250/day, Honda PCX 160 is ฿380/day, and the Honda Forza 350 is ฿650/day.",
      },
    },
    {
      "@type": "Question",
      name: "Where is AP Bike Center located in Pattaya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AP Bike Center is on Second Road, Pattaya City, between Soi 8 and Soi 9. Open every day from 10:00 AM to 6:59 PM.",
      },
    },
  ],
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
        {/* JSON-LD: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* JSON-LD: FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
