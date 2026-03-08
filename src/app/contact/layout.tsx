import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Location | AP Bike Center Pattaya",
  description:
    "Find AP Bike Center on Second Road, Pattaya (between Soi 8 & Soi 9). Open every day 10:00 AM – 7:00 PM. 24-hour support via LINE. No passport deposit required.",
  keywords: [
    "AP Bike Center contact",
    "bike rental Pattaya location",
    "Second Road Pattaya motorbike",
    "Pattaya scooter rental address",
  ],
  openGraph: {
    title: "Contact & Location | AP Bike Center Pattaya",
    description:
      "Second Road, Pattaya (Soi 8–9). Open daily 10:00–19:00. 24h LINE support.",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://apbikecenter.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
