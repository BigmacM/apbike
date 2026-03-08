import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traffic Rules & Road Guide | AP Bike Center Pattaya",
  description:
    "Essential Thailand traffic rules for motorbike riders in Pattaya. Driver's licence requirements, helmet laws, fuel stations, curb colour meanings and more. Know before you ride.",
  keywords: [
    "Thailand traffic rules",
    "Pattaya motorbike rules",
    "driving in Thailand",
    "helmet law Thailand",
    "gas stations Pattaya",
    "Thai road rules tourists",
  ],
  openGraph: {
    title: "Traffic Rules & Road Guide | AP Bike Center Pattaya",
    description:
      "Everything you need to know before riding in Pattaya — licences, helmets, fuel, curb colours and more.",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://apbikecenter.com/traffic-rules",
  },
};

export default function TrafficRulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
