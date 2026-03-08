"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, AlertTriangle, Info, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BikeGrid, { type Bike } from "@/components/BikeGrid";
import BookingForm from "@/components/BookingForm";

// ─── What's Included ──────────────────────────────────────────────────────────
function WhatsIncluded() {
  const items = [
    {
      emoji: "⛑️",
      title: "Free Helmet",
      desc: "A clean helmet is included with every rental at no extra cost. Ask for a second helmet if you have a passenger.",
    },
    {
      emoji: "⛽",
      title: "Full Tank of Fuel",
      desc: "Every bike leaves the shop with a full tank. Return it full and there's no fuel charge. Can't refuel before return? Top up at the shop and pay the difference.",
    },
    {
      emoji: "📱",
      title: "Smartphone Holder",
      desc: "A spring-loaded phone mount is fitted to every bike so you can navigate with Google Maps hands-free. Note: we can't be responsible for phones that fall on very rough roads.",
    },
    {
      emoji: "📞",
      title: "24h Roadside Assistance",
      desc: "Puncture or mechanical issue during normal use? Contact us immediately. We'll repair or swap the bike at no charge. Late-night issues may be resolved the following morning.",
    },
    {
      emoji: "🛡️",
      title: "No Passport Held",
      desc: "We never hold your passport. All we need is a photocopy of your ID and a refundable cash deposit. Your passport stays with you.",
    },
  ];

  return (
    <section className="py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
            <CheckCircle size={14} /> Every Rental Includes
          </span>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">
            What&apos;s Included
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No hidden extras — everything below comes standard with every bike, every day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 shadow-soft flex flex-col gap-3"
            >
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="font-display font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Rental Policies ─────────────────────────────────────────────────────────
const policies = [
  {
    emoji: "🔐",
    title: "Theft & Loss",
    body: (
      <>
        <p>
          In the event of loss or theft of the motorcycle, you will be charged the replacement
          value. For older models this is approximately <strong>฿40,000</strong>. We have not had
          any theft cases to date, but please take precautions:
        </p>
        <ul className="mt-3 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-red-500 shrink-0">⚠</span>
            <span>
              <strong>Never leave the key in the bike.</strong> In Thailand, a bike with the key
              inserted can be ridden away in seconds.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean shrink-0">→</span>
            <span>Always lock the handlebar when parked, even briefly.</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    emoji: "🗝️",
    title: "Lost Keys & Helmets",
    body: (
      <>
        <p>If your key or helmet is lost or damaged, contact us immediately.</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { item: "Standard key lost", fee: "฿250" },
            { item: "2023 CLICK electronic key lost", fee: "฿1,250" },
            { item: "Helmet lost or damaged", fee: "฿300" },
          ].map((row) => (
            <div key={row.item} className="bg-sand rounded-xl p-3">
              <p className="text-xs text-gray-500">{row.item}</p>
              <p className="font-display font-bold text-gray-900 text-lg">{row.fee}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          The 2023 Honda CLICK uses an electronic key — replacement cost is significantly higher
          than a standard cut key.
        </p>
      </>
    ),
  },
  {
    emoji: "⛽",
    title: "Fuel Policy",
    body: (
      <>
        <p>
          Your bike is provided with a <strong>full tank of fuel</strong>. At the time of return:
        </p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
            <span>
              Return with a full tank — <strong>no fuel charge</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Info size={15} className="text-ocean shrink-0 mt-0.5" />
            <span>
              Can&apos;t refuel before returning? Bring it back as-is and top up at the shop —
              you only pay for the fuel used.
            </span>
          </li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          All bikes use <strong>91 octane</strong> (say &ldquo;Gao Nung&rdquo; at the station).
          Ask for &ldquo;Temm Tung&rdquo; for a full tank.{" "}
          <a href="/traffic-rules" className="text-ocean underline hover:no-underline">
            See our full fuel guide →
          </a>
        </p>
      </>
    ),
  },
  {
    emoji: "📱",
    title: "Smartphone Holder",
    body: (
      <p>
        Every bike has a spring-loaded phone mount — perfect for Google Maps. The spring design
        works well on smooth roads but may not hold firm on rough terrain. AP Bike Center cannot
        be responsible for phone damage caused by the holder. If you&apos;re concerned, secure
        the phone with a rubber band for extra grip.
      </p>
    ),
  },
  {
    emoji: "🔧",
    title: "Breakdowns & Punctures",
    body: (
      <>
        <p>
          If a puncture or mechanical fault occurs during <em>normal use</em>, we will repair
          the bike or provide a free replacement at <strong>no charge to you</strong> (subject to
          availability).
        </p>
        <p className="mt-2">
          Contact us via LINE immediately. After the condition check at rental handover, AP Bike
          Center cannot be held responsible for accidents, theft, or damage caused by the rider.
        </p>
      </>
    ),
  },
];

function RentalPolicies() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-sunset/10 text-sunset font-semibold text-sm px-4 py-2 rounded-full mb-4">
            📋 Rental Policies
          </span>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">
            Policies & Conditions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No surprises — read these before you ride so everyone is on the same page.
          </p>
        </motion.div>

        <div className="space-y-4">
          {policies.map((p, i) => (
            <motion.details
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-sand rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:text-ocean transition-colors">
                <span className="flex items-center gap-3 font-semibold text-gray-900">
                  <span className="text-xl">{p.emoji}</span>
                  {p.title}
                </span>
                <span className="shrink-0 text-ocean text-xl leading-none group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-5 pb-6 text-sm text-gray-600 leading-relaxed">
                {p.body}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Traffic Rules Banner ─────────────────────────────────────────────────────
function TrafficRulesBanner() {
  return (
    <section className="py-10 bg-amber-50 border-y border-amber-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle size={28} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-gray-900 text-lg">
                Know Thailand&apos;s Traffic Rules Before You Ride
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Helmet laws, licence requirements, curb colour meanings, fuel stations and more —
                all in one easy guide.
              </p>
            </div>
          </div>
          <a
            href="/traffic-rules"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors whitespace-nowrap"
          >
            🚦 Read the Guide
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function BikesPage() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen font-sans bg-white">
      <Navbar lightBg />

      {/* Page header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-sand to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-5">
              🏍️ Full Fleet
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl text-gray-900 leading-tight mb-5">
              All Bikes &{" "}
              <span className="gradient-text">Prices</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              From beginner-friendly scooters to premium maxi-scooters — pick your ride, book
              online, and collect with just an ID copy and a cash deposit.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Shield size={14} />, label: "No passport deposit" },
                { icon: <span className="text-sm">⛑️</span>, label: "Free helmets" },
                { icon: <Star size={14} fill="#ff8c42" stroke="none" />, label: "5★ rated" },
                { icon: <span className="text-sm">📞</span>, label: "24h roadside support" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-sm"
                >
                  <span className="text-ocean">{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BikeGrid onSelectBike={handleSelectBike} />
      <WhatsIncluded />
      <RentalPolicies />
      <TrafficRulesBanner />

      <Footer />

      <BookingForm
        bike={selectedBike}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-30 sm:hidden"
      >
        <button
          onClick={() => { setSelectedBike(null); setBookingOpen(true); }}
          className="bg-gradient-sunset text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-sm active:scale-95 transition-transform"
        >
          <span>🏍️</span>
          Book Now
        </button>
      </motion.div>
    </main>
  );
}
