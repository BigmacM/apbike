"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Shield, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapCard from "@/components/MapCard";

function InfoRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-ocean/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-gray-900 font-semibold mt-0.5">{value}</p>
        {sub && <p className="text-sm text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Do you require a passport as a deposit?",
    a: "Never. We only ask for a photocopy of your passport or ID plus a refundable cash deposit. Your passport stays with you at all times.",
  },
  {
    q: "How do I reach you outside business hours?",
    a: "Our LINE support is available 24 hours a day, 7 days a week. Message us anytime and our team will respond as quickly as possible.",
  },
  {
    q: "Where exactly are you located?",
    a: "We are on Second Road, Pattaya City, between Soi 8 and Soi 9. We are easy to spot — look for the bikes parked outside.",
  },
  {
    q: "Can I book in advance?",
    a: "Yes. Use the booking form on our website, choose your dates, and we will confirm your reservation via LINE. We recommend booking at least a day ahead during peak season.",
  },
  {
    q: "What payment do you accept?",
    a: "We accept cash only. The deposit is refundable when you return the bike in its original condition.",
  },
];

export default function ContactPage() {
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
              <MapPin size={14} /> Find Us
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl text-gray-900 leading-tight mb-4">
              Contact &{" "}
              <span className="gradient-text">Location</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We are on Second Road, right in the heart of Pattaya. Drop by during business
              hours or reach us on LINE anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + contact details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-3 rounded-3xl overflow-hidden shadow-card"
            >
              <MapCard minHeight={400} />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="bg-sand rounded-3xl p-7 flex flex-col gap-6">
                <h2 className="font-display font-bold text-2xl text-gray-900">
                  AP Bike Center
                </h2>

                <div className="space-y-5">
                  <InfoRow
                    icon={<MapPin size={20} className="text-ocean" />}
                    label="Address"
                    value="Second Road, Pattaya City"
                    sub="Between Soi 8 and Soi 9"
                  />
                  <InfoRow
                    icon={<Clock size={20} className="text-ocean" />}
                    label="Business Hours"
                    value="10:00 AM – 6:59 PM"
                    sub="Every day of the week"
                  />
                  <InfoRow
                    icon={<Phone size={20} className="text-ocean" />}
                    label="Support"
                    value="24h via LINE"
                    sub="Message us anytime — we respond fast"
                  />
                </div>

                {/* LINE CTA */}
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors"
                >
                  <MessageCircle size={20} />
                  Message Us on LINE
                </a>
              </div>

              {/* What to bring */}
              <div className="bg-ocean/5 border border-ocean/15 rounded-3xl p-6">
                <p className="font-semibold text-ocean text-sm flex items-center gap-2 mb-3">
                  <Shield size={15} />
                  What to Bring
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✅</span>
                    <span>A photocopy of your passport or national ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✅</span>
                    <span>A refundable cash deposit (amount varies by bike)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">❌</span>
                    <span>
                      <strong>No passport deposit</strong> — your passport always stays with you
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-sand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-sunset/10 text-sunset font-semibold text-sm px-4 py-2 rounded-full mb-4">
              ❓ FAQ
            </span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">
              Common Questions
            </h2>
            <p className="text-gray-500">
              Can&apos;t find your answer? Message us on LINE — we reply fast.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-gray-900 list-none select-none hover:text-ocean transition-colors">
                  {faq.q}
                  <span className="shrink-0 text-ocean text-xl leading-none group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-ocean text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-4xl mb-4">Ready to Ride?</h2>
            <p className="text-white/80 text-lg mb-8">
              Browse our fleet and book your bike online — we confirm via LINE within minutes.
            </p>
            <a
              href="/bikes"
              className="inline-flex items-center gap-2.5 bg-white text-ocean font-bold text-lg px-10 py-4 rounded-2xl hover:bg-sand transition-colors shadow-lg"
            >
              <span>🏍️</span>
              View All Bikes
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
