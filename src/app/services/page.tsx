"use client";

import { motion } from "framer-motion";
import { Wrench, ShoppingCart, Paintbrush, Fuel, Bike } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: <Wrench size={28} className="text-ocean" />,
    emoji: "🛞",
    title: "Flat Tyre Repair",
    desc: "Got a flat? Bring the bike to our shop and we'll fix it free of charge. If you had it repaired elsewhere, bring your receipt and we'll reimburse you up to ฿100 as a deposit refund.",
    details: [
      "Free repair when you bring the bike to us",
      "Up to ฿100 reimbursement with external receipt",
    ],
    image: "/images/AP Bike Additional Services/AP Bike Repair Buy Sell Paint (1).jpeg",
  },
  {
    icon: <ShoppingCart size={28} className="text-sunset" />,
    emoji: "🤝",
    title: "Buy & Sell Bikes",
    desc: "Looking to sell your bike or pick one up? In addition to rentals, we run a buy-and-sell service for motorbikes. Come talk to us — we offer fair prices.",
    details: [
      "We buy your bike at a fair price",
      "Browse second-hand bikes available for purchase",
    ],
    image: "/images/AP Bike Additional Services/AP Bike Repair Buy Sell Paint (2).jpeg",
  },
  {
    icon: <Bike size={28} className="text-palm" />,
    emoji: "🔧",
    title: "General Repairs & Maintenance",
    desc: "Hearing a strange noise? Need an oil change or brake service? Our mechanics handle a wide range of repairs — just bring the bike in and we'll take a look.",
    details: [
      "Oil changes",
      "Tyre pressure & tyre changes",
      "Brake blade replacement",
      "Strange noise diagnosis",
      "And more — just ask!",
    ],
    image: "/images/AP Bike Additional Services/AP Bike Repair Buy Sell Paint (3).jpeg",
  },
  {
    icon: <Paintbrush size={28} className="text-sunset" />,
    emoji: "🎨",
    title: "Custom Bike Modifications",
    desc: "Make your bike uniquely yours. We offer a range of customisation options — from a fresh wheel paint job to full vinyl wraps, muffler upgrades, and LED installs.",
    details: [
      "Wheel painting",
      "Vinyl wrap / film wrap",
      "Muffler / exhaust changes",
      "LED lighting installation",
      "Contact us for bespoke requests",
    ],
    image: "/images/AP Bike Additional Services/AP Bike Repair Buy Sell Paint (4).jpeg",
  },
  {
    icon: <Fuel size={28} className="text-ocean" />,
    emoji: "⛽",
    title: "Fuel / Gasoline Sales",
    desc: "No petrol station nearby? No problem. We sell gasoline right here at the bike center so you're never left stranded in town.",
    details: [
      "Convenient on-site fuel top-up",
      "No need to search for a gas station in town",
    ],
    image: "/images/AP Bike Additional Services/AP Bike Repair Buy Sell Paint (5).jpeg",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen font-sans bg-sand">
      <Navbar lightBg />

      {/* Header */}
      <section className="pt-28 pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
              <Wrench size={14} /> More Than Just Rentals
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-5">
              Additional Services
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              AP Bike Center offers a range of services beyond bike rental — from
              repairs and maintenance to custom modifications and on-site fuel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className={`bg-white rounded-3xl shadow-soft overflow-hidden flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="lg:w-2/5 h-64 lg:h-auto shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sand flex items-center justify-center shrink-0">
                      {service.icon}
                    </div>
                    <h2 className="font-display font-bold text-2xl text-gray-900">
                      <span className="mr-2">{service.emoji}</span>
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-5">{service.desc}</p>

                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-ocean mt-0.5 shrink-0">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-ocean">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
              Got a question about a service?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Drop by the shop or reach out on LINE — we&apos;re happy to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-ocean font-bold px-8 py-4 rounded-2xl hover:opacity-90 active:scale-[0.97] transition-all shadow-lg text-base"
            >
              Contact Us
              <span>💬</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
