"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  MessageCircle,
  MapPin,
  Crown,
  FileText,
} from "lucide-react";
import type { Bike } from "./BikeGrid";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 28, stiffness: 380 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

interface PriceCalculatorProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PriceCalculator({
  bike,
  isOpen,
  onClose,
}: PriceCalculatorProps) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(tomorrow);
  const [guaranteedModel, setGuaranteedModel] = useState(false);
  const [receiptNeeded, setReceiptNeeded] = useState(false);

  // Auto-calculate days
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const basePrice = bike ? bike.pricePerDay * days : 0;
  const addonPrice = guaranteedModel ? 100 : 0;
  const totalPrice = basePrice + addonPrice;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setPickupDate(today);
      setReturnDate(tomorrow);
      setGuaranteedModel(false);
      setReceiptNeeded(false);
    }
  }, [isOpen, today, tomorrow]);

  const inputClass =
    "w-full bg-sand border-2 border-transparent focus:border-ocean rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:bg-white";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[90vh] flex flex-col glass rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-glow"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-ocean flex items-center justify-center text-white text-lg">
                  🧮
                </div>
                <div>
                  <h2 className="font-display font-bold text-gray-900 text-lg leading-tight">
                    {bike ? bike.name : "Price Calculator"}
                  </h2>
                  {bike && (
                    <p className="text-xs text-gray-500">
                      {bike.cc} · From ฿{bike.pricePerDay}/day
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={17} className="text-gray-600" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Dates */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar size={15} className="text-ocean" />
                  Rental Period
                  <span className="ml-auto text-xs font-normal text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> Open 10:00 – 19:00
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      min={today}
                      onChange={(e) => {
                        setPickupDate(e.target.value);
                        if (e.target.value >= returnDate) {
                          const next = new Date(
                            new Date(e.target.value).getTime() + 86400000
                          )
                            .toISOString()
                            .split("T")[0];
                          setReturnDate(next);
                        }
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={pickupDate || today}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Duration pill */}
                <div className="flex items-center gap-2 bg-ocean/10 rounded-xl px-4 py-2.5 mt-3">
                  <Calendar size={15} className="text-ocean" />
                  <span className="text-sm text-ocean font-semibold">
                    {days} day{days !== 1 ? "s" : ""} rental
                  </span>
                  <span className="ml-auto text-sm font-bold text-ocean">
                    ฿{basePrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Add-Ons & Options
                </p>

                <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-transparent bg-sand hover:border-ocean/30 cursor-pointer transition-all has-[:checked]:border-ocean has-[:checked]:bg-ocean/5 mb-3">
                  <input
                    type="checkbox"
                    checked={guaranteedModel}
                    onChange={(e) => setGuaranteedModel(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-ocean rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Crown size={14} className="text-gray-500" />
                      <span className="font-semibold text-sm text-gray-900">
                        Guaranteed Model
                      </span>
                      <span className="bg-sunset text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        +฿100
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Reserve the exact bike model shown — guaranteed on pickup day.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-transparent bg-sand hover:border-ocean/30 cursor-pointer transition-all has-[:checked]:border-ocean has-[:checked]:bg-ocean/5">
                  <input
                    type="checkbox"
                    checked={receiptNeeded}
                    onChange={(e) => setReceiptNeeded(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-ocean rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-500" />
                      <span className="font-semibold text-sm text-gray-900">
                        Receipt Needed
                      </span>
                      <span className="text-xs text-gray-400 font-normal">(Free)</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      We&apos;ll prepare an official rental receipt for you.
                    </p>
                  </div>
                </label>
              </div>

              {/* Price breakdown */}
              <div className="bg-sand rounded-2xl p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Price Breakdown
                </p>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>
                    ฿{bike?.pricePerDay}/day × {days} day{days !== 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold">฿{basePrice.toLocaleString()}</span>
                </div>
                {guaranteedModel && (
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Guaranteed model add-on</span>
                    <span className="font-semibold">฿100</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Estimated Total</span>
                  <span className="font-display font-black text-xl text-ocean">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <span className="text-base shrink-0">ℹ️</span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Online booking is coming soon. To reserve your bike, contact us directly
                  via LINE or visit the shop. We confirm fast — usually within minutes.
                </p>
              </div>

              {/* What to bring */}
              <div className="bg-ocean/5 border border-ocean/15 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-semibold text-ocean uppercase tracking-wide mb-2">
                  What to bring on pickup
                </p>
                {[
                  "Copy of your passport or ID",
                  "Cash deposit (refundable)",
                  "No passport held — ever",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{i < 2 ? "✅" : "❌"}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-white/80 backdrop-blur-sm space-y-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Estimated total</span>
                <span className="font-display font-black text-xl text-ocean">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>

              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle size={18} />
                Contact Us on LINE to Book
              </a>

              <a
                href="/contact"
                className="w-full border-2 border-ocean text-ocean font-semibold py-3 px-6 rounded-2xl hover:bg-ocean/5 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MapPin size={15} />
                Visit Us · Second Road, Soi 8–9
              </a>

              <p className="text-center text-xs text-gray-400">
                Open 10:00 AM – 7:00 PM · We reply on LINE within minutes
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
