import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Bikes & Prices | AP Bike Center Pattaya",
  description:
    "Browse our full fleet of motorbikes and scooters in Pattaya. Honda Click 125i from ฿220/day, PCX 160, Forza 350, Yamaha NMAX & XMAX. No passport deposit. Free helmets included.",
  keywords: [
    "motorbike rental Pattaya prices",
    "Honda Click rental Pattaya",
    "Honda PCX 160 rental",
    "Honda Forza 350 Pattaya",
    "Yamaha NMAX rental Pattaya",
    "scooter hire Pattaya",
  ],
  openGraph: {
    title: "All Bikes & Prices | AP Bike Center Pattaya",
    description:
      "Full fleet of motorbikes from ฿220/day. No passport deposit. Free helmets. Browse & book online.",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://apbikecenter.com/bikes",
  },
};

export default function BikesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
