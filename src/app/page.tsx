"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Star,
  Shield,
  Headphones,
  Wrench,
  ChevronDown,
  Sun,
} from "lucide-react";
import BikeGrid, { type Bike } from "@/components/BikeGrid";
import BookingForm from "@/components/BookingForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onBookNow }: { onBookNow: () => void }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-20" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-ocean/20 via-transparent to-sunset/20" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-sunset/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-[8%] w-40 h-40 rounded-full bg-ocean/25 blur-2xl"
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge — white background ensures readable contrast on any hero image */}
            <span className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-md">
              <Sun size={14} className="text-sunset" />
              Pattaya&apos;s Most Trusted Bike Rental
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="#ff8c42" stroke="none" />
                ))}
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-5"
          >
            Explore
            <br />
            <span className="text-sunset">Pattaya</span>
            <br />
            Your Way.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
          >
            Bring a copy of your ID and a cash deposit —{" "}
            <span className="font-semibold text-white">your passport stays with you</span>.
            Every rental includes a free helmet and 24-hour roadside assistance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <button
              onClick={onBookNow}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-sunset text-white font-bold text-lg px-8 py-4 rounded-2xl hover:opacity-90 active:scale-[0.97] transition-all shadow-lg"
            >
              <span>🏍️</span>
              Book Your Ride Now
            </button>
            <a
              href="/bikes"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold text-base px-7 py-4 rounded-2xl hover:bg-white/10 transition-all"
            >
              View All Bikes
              <ChevronDown size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: <MapPin size={13} />, label: "Second Road, Soi 8–9" },
              { icon: <Clock size={13} />, label: "Open 10:00 – 18:59" },
              { icon: <Shield size={13} />, label: "No Passport Required" },
            ].map((pill) => (
              <span
                key={pill.label}
                className="glass-dark text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5"
              >
                {pill.icon}
                {pill.label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/70 text-xs font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-9 rounded-full border-2 border-white/50 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2.5 bg-white/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── USP Bar ──────────────────────────────────────────────────────────────────
function UspBar() {
  const usps = [
    {
      icon: <Shield size={22} className="text-ocean" />,
      title: "No Passport Deposit",
      desc: "ID copy & cash only — your passport stays with you",
    },
    {
      icon: <span className="text-2xl">⛑️</span>,
      title: "Free Helmets",
      desc: "Included with every single rental",
    },
    {
      icon: <Headphones size={22} className="text-sunset" />,
      title: "24h Roadside Assistance",
      desc: "We're with you wherever you ride",
    },
    {
      icon: <Wrench size={22} className="text-palm" />,
      title: "Pro Maintenance",
      desc: "Every bike fully serviced & inspected",
    },
  ];

  return (
    <section className="bg-sand py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl shadow-soft"
            >
              <div className="w-12 h-12 rounded-xl bg-sand flex items-center justify-center">
                {usp.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 text-sm mb-1">
                  {usp.title}
                </h3>
                <p className="text-xs text-gray-500">{usp.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      emoji: "🏍️",
      title: "Choose Your Bike",
      desc: "Browse our fleet and pick the perfect scooter or maxi-scooter for your trip.",
    },
    {
      emoji: "📝",
      title: "Fill the Form",
      desc: "Select your dates, add-ons, and send your booking request in under 2 minutes.",
    },
    {
      emoji: "💬",
      title: "We Confirm via LINE",
      desc: "Our team confirms your booking directly on LINE — fast and personal.",
    },
    {
      emoji: "🌴",
      title: "Ride & Explore",
      desc: "Pick up with just a copy of your ID and a cash deposit. No passport needed.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-sunset/10 text-sunset font-semibold text-sm px-4 py-2 rounded-full mb-4">
            <span>✨</span> Super Easy Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From browsing to riding — it takes less than 5 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-ocean/30 to-transparent -translate-x-6 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-sand rounded-3xl">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center text-3xl">
                    {s.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-ocean text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-gradient-ocean relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <span>🌟</span> The AP Difference
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              Your Passport
              <br />
              <span className="text-sunset">Stays Safe.</span>
              <br />
              We Promise.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Unlike many rental shops, we never ask for your passport as a deposit.
              A copy of your ID and a cash deposit is all you need. Your passport
              is your lifeline — we know that.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🛡️", text: "ID copy + cash deposit only — passport never required" },
                { icon: "⛑️", text: "Free helmet included — your safety matters to us" },
                { icon: "📞", text: "24-hour roadside assistance — we pick you up, anywhere" },
                { icon: "🔧", text: "Every bike professionally maintained and road-ready" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 shrink-0">{item.icon}</span>
                  <p className="text-white/90 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "NO", label: "Passport Deposit", sub: "Just an ID copy & cash" },
              { value: "24h", label: "Roadside Support", sub: "365 days a year" },
              { value: "100+", label: "Happy Tourists", sub: "Last month alone" },
              { value: "5★", label: "Average Rating", sub: "On Google Reviews" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-3xl p-6 text-center">
                <p className="font-display font-black text-4xl text-ocean mb-1">
                  {stat.value}
                </p>
                <p className="font-semibold text-gray-800 text-sm">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function LocationSection({ onBookNow }: { onBookNow: () => void }) {
  return (
    <section id="location" className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
            <MapPin size={14} /> Easy to Find
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Us in Pattaya
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Right on Second Road — perfectly located between Soi 8 and Soi 9.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-card min-h-72"
          >
            <iframe
              title="AP Bike Center Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2!2d100.888!3d12.934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102ab5e38d9c4c7%3A0x0!2zMTLCsDU2JzAyLjQiTiAxMDDCsDUzJzE2LjgiRQ!5e0!3m2!1sen!2sth!4v1699000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-soft flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-5">
                Visit Us
              </h3>
              <div className="space-y-4">
                <InfoRow
                  icon={<MapPin size={18} className="text-ocean" />}
                  label="Address"
                  value="Second Road, Pattaya City (between Soi 8 & Soi 9)"
                />
                <InfoRow
                  icon={<Clock size={18} className="text-ocean" />}
                  label="Business Hours"
                  value="10:00 AM – 6:59 PM (Every day)"
                />
                <InfoRow
                  icon={<Phone size={18} className="text-ocean" />}
                  label="Hotline"
                  value="Available via LINE (24h)"
                />
              </div>
            </div>

            <div className="bg-ocean/8 rounded-2xl p-4 space-y-2">
              <p className="font-semibold text-ocean text-sm flex items-center gap-2">
                <Shield size={15} />
                What to Bring
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2">✅ Copy of your passport/ID</li>
                <li className="flex items-center gap-2">✅ Cash deposit (refundable)</li>
                <li className="flex items-center gap-2">❌ No passport held as deposit</li>
              </ul>
            </div>

            <button
              onClick={onBookNow}
              className="w-full bg-gradient-ocean text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-auto"
            >
              <span>🏍️</span>
              Book Your Ride Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-gray-800 text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection() {
  const faqs = [
    {
      q: "Do I need to leave my passport as a deposit?",
      a: "No — we never hold your passport. We only ask for a copy of your passport or ID plus a refundable cash deposit.",
    },
    {
      q: "What is included in the rental price?",
      a: "Every rental includes a free helmet. Pricing is per day with no hidden fees. Optional add-ons like a guaranteed model are available at checkout.",
    },
    {
      q: "What happens if the bike breaks down?",
      a: "We offer 24-hour roadside assistance every day of the year. Contact us via LINE and we will come to you.",
    },
    {
      q: "What bikes do you have available?",
      a: "We offer Honda Click 125i, Honda Scoopy, Honda PCX 160, Yamaha NMAX, Honda Forza 350, and Yamaha XMAX. Prices start from ฿220/day.",
    },
    {
      q: "How do I confirm my booking?",
      a: "Fill in the booking form on our website and we will confirm via LINE. The whole process takes under 5 minutes.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
            ❓ Common Questions
          </span>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-sand rounded-2xl overflow-hidden"
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
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function Home() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setBookingOpen(true);
  };

  const handleBookNow = () => {
    setSelectedBike(null);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <HeroSection onBookNow={handleBookNow} />
      <UspBar />
      <BikeGrid onSelectBike={handleSelectBike} />
      <HowItWorks />
      <WhyUs />
      <FaqSection />
      <LocationSection onBookNow={handleBookNow} />
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
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-30 sm:hidden"
      >
        <button
          onClick={handleBookNow}
          className="bg-gradient-sunset text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 text-sm active:scale-95 transition-transform"
        >
          <span>🏍️</span>
          Book Now
        </button>
      </motion.div>
    </main>
  );
}
