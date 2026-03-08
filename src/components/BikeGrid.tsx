"use client";

import { motion } from "framer-motion";
import { Zap, Navigation, Crown, Check, Star } from "lucide-react";

export interface Bike {
  id: string;
  name: string;
  cc: string;
  category: string;
  categoryIcon: React.ReactNode;
  categoryColor: string;
  tagline: string;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const bikes: Bike[] = [
  // Easy Riding Category
  {
    id: "honda-click-125i",
    name: "Honda Click 125i",
    cc: "125cc",
    category: "Easy Riding",
    categoryIcon: <Zap size={14} />,
    categoryColor: "bg-ocean text-white",
    tagline: "Perfect for city hopping & beach cruising",
    pricePerDay: 250,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    features: [
      "Automatic transmission",
      "Great fuel economy",
      "Easy to park",
      "Ideal for beginners",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "honda-scoopy",
    name: "Honda Scoopy",
    cc: "110cc",
    category: "Easy Riding",
    categoryIcon: <Zap size={14} />,
    categoryColor: "bg-ocean text-white",
    tagline: "Retro-chic style meets effortless riding",
    pricePerDay: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
    features: [
      "Vintage aesthetic",
      "Smooth automatic",
      "Low seat height",
      "Compact & nimble",
    ],
  },
  // Explorer Category
  {
    id: "honda-pcx-160",
    name: "Honda PCX 160",
    cc: "160cc",
    category: "The Explorer",
    categoryIcon: <Navigation size={14} />,
    categoryColor: "bg-sunset text-white",
    tagline: "Day trips to Jomtien, Bang Saray & beyond",
    pricePerDay: 380,
    imageUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
    features: [
      "Smart key system",
      "Large underseat storage",
      "ABS braking",
      "Highway capable",
    ],
    badge: "Staff Pick",
  },
  {
    id: "yamaha-nmax",
    name: "Yamaha NMAX",
    cc: "155cc",
    category: "The Explorer",
    categoryIcon: <Navigation size={14} />,
    categoryColor: "bg-sunset text-white",
    tagline: "Sporty performance for the adventurous rider",
    pricePerDay: 370,
    imageUrl:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
    features: [
      "Variable valve actuation",
      "Traction control",
      "Dual channel ABS",
      "Sport-tuned suspension",
    ],
  },
  // Powerful Category
  {
    id: "honda-forza-350",
    name: "Honda Forza 350",
    cc: "350cc",
    category: "Powerful Choice",
    categoryIcon: <Crown size={14} />,
    categoryColor: "bg-palm text-white",
    tagline: "The ultimate premium maxi-scooter experience",
    pricePerDay: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=600&q=80",
    features: [
      "6-speed DCT gearbox",
      "Windscreen adjust",
      "Honda Smartphone Connect",
      "Premium ride quality",
    ],
    badge: "Premium",
    popular: true,
  },
  {
    id: "yamaha-xmax",
    name: "Yamaha XMAX",
    cc: "300cc",
    category: "Powerful Choice",
    categoryIcon: <Crown size={14} />,
    categoryColor: "bg-palm text-white",
    tagline: "Tour-ready power with maxi-scooter luxury",
    pricePerDay: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    features: [
      "Advanced traction control",
      "Large 45L storage",
      "Heated grips option",
      "Long-range tank",
    ],
  },
];

const categoryOrder = ["Easy Riding", "The Explorer", "Powerful Choice"];

const categoryMeta: Record<
  string,
  { description: string; emoji: string; gradient: string; curbColor: string }
> = {
  "Easy Riding": {
    description: "110–125cc · Perfect for city exploration",
    emoji: "🌴",
    gradient: "from-ocean/10 to-ocean/5",
    curbColor: "#FFD700", // yellow/white — classic Pattaya curb
  },
  "The Explorer": {
    description: "150–160cc · Longer trips & coastal roads",
    emoji: "🗺️",
    gradient: "from-sunset/10 to-sunset/5",
    curbColor: "#ff8c42", // orange/white — sunset curb
  },
  "Powerful Choice": {
    description: "300–350cc · Premium maxi-scooter luxury",
    emoji: "👑",
    gradient: "from-palm/10 to-palm/5",
    curbColor: "#CC1515", // red/white — no-parking curb (powerful)
  },
};

interface BikeGridProps {
  onSelectBike: (bike: Bike) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function BikeGrid({ onSelectBike }: BikeGridProps) {
  const grouped = categoryOrder.reduce<Record<string, Bike[]>>((acc, cat) => {
    acc[cat] = bikes.filter((b) => b.category === cat);
    return acc;
  }, {});

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
            <span>🏍️</span> Our Premium Fleet
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Ride
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every bike is fully serviced, insured, and ready for Pattaya
            adventure. Free helmet with every rental.
          </p>
        </motion.div>

        {/* Categories */}
        {categoryOrder.map((category) => {
          const meta = categoryMeta[category];
          return (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-3 bg-gradient-to-r ${meta.gradient} rounded-2xl px-6 py-3 mb-8`}
              >
                <span className="text-2xl">{meta.emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-500">{meta.description}</p>
                </div>
              </motion.div>

              {/* Bike Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {grouped[category].map((bike) => (
                  <BikeCard
                    key={bike.id}
                    bike={bike}
                    curbColor={meta.curbColor}
                    onSelect={onSelectBike}
                  />
                ))}
              </motion.div>
            </div>
          );
        })}

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-sand rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { icon: "🛡️", label: "No Passport Deposit", sub: "Copy & Cash Only" },
            { icon: "⛑️", label: "Free Helmets", sub: "Every rental" },
            { icon: "🚨", label: "24h Roadside Help", sub: "We've got you covered" },
            { icon: "🔧", label: "Pro Maintenance", sub: "Fully serviced fleet" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BikeCard({
  bike,
  curbColor,
  onSelect,
}: {
  bike: Bike;
  curbColor: string;
  onSelect: (bike: Bike) => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/bikes/${bike.id}.jpg`}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Pattaya curb stripe — inspired by the iconic Thai road-kerb markings */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-3"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              ${curbColor} 0px,
              ${curbColor} 32px,
              #ffffff 32px,
              #ffffff 64px
            )`,
            opacity: 0.92,
          }}
        />

        {/* Badge */}
        {bike.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`${bike.categoryColor} text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5`}
            >
              {bike.categoryIcon}
              {bike.badge}
            </span>
          </div>
        )}

        {/* Popular star */}
        {bike.popular && !bike.badge && (
          <div className="absolute top-3 right-3">
            <span className="bg-sunset text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star size={11} fill="white" />
              Popular
            </span>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <div className="glass rounded-xl px-3 py-1.5 text-right">
            <p className="text-xs text-gray-600">from</p>
            <p className="font-display font-bold text-ocean text-lg leading-none">
              ฿{bike.pricePerDay}
              <span className="text-xs font-normal text-gray-500">/day</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h4 className="font-display font-bold text-xl text-gray-900">
              {bike.name}
            </h4>
            <p className="text-sm text-gray-500 mt-0.5">{bike.tagline}</p>
          </div>
          <span
            className={`${bike.categoryColor} text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2`}
          >
            {bike.cc}
          </span>
        </div>

        {/* Features */}
        <ul className="mt-4 space-y-1.5">
          {bike.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={14} className="text-ocean shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSelect(bike)}
          className="mt-5 w-full bg-gradient-ocean text-white font-semibold py-3 px-6 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <span>Book This Bike</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}
