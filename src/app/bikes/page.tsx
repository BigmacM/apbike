"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BikeGrid, { type Bike } from "@/components/BikeGrid";
import BookingForm from "@/components/BookingForm";

export default function BikesPage() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen font-sans bg-white">
      <Navbar />

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
              online, and pick up with just a copy of your ID and a cash deposit.
            </p>

            {/* Trust badges */}
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

      {/* Bike grid — removes its own section padding so it flows naturally */}
      <BikeGrid onSelectBike={handleSelectBike} />

      <Footer />

      <BookingForm
        bike={selectedBike}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Mobile floating CTA */}
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
