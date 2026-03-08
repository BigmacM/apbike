"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Fuel,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Curb swatch ──────────────────────────────────────────────────────────────
function CurbSwatch({
  colorA,
  colorB,
  label,
  rule,
  icon,
}: {
  colorA: string;
  colorB: string;
  label: string;
  rule: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-soft"
    >
      {/* Curb stripe — wider so it's clearly visible */}
      <div
        className="h-7 w-full"
        style={{
          background: `repeating-linear-gradient(90deg, ${colorA} 0px, ${colorA} 48px, ${colorB} 48px, ${colorB} 96px)`,
        }}
        aria-hidden
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-display font-bold text-gray-900">{label}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{rule}</p>
      </div>
    </motion.div>
  );
}

// ─── Rule card ────────────────────────────────────────────────────────────────
function RuleCard({
  emoji,
  title,
  children,
  warning,
  delay = 0,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
  warning?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`rounded-3xl p-6 ${warning ? "bg-red-50 border border-red-100" : "bg-white shadow-soft"}`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl shrink-0 mt-0.5">{emoji}</span>
        <div>
          <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{title}</h3>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrafficRulesPage() {
  return (
    <main className="min-h-screen font-sans bg-white">
      <Navbar lightBg />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-sand to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-semibold text-sm px-4 py-2 rounded-full mb-5">
              🚦 Know Before You Ride
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl text-gray-900 leading-tight mb-5">
              Thailand Traffic{" "}
              <span className="gradient-text">Rules & Road Guide</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              Traffic enforcement in Thailand is strict and getting stricter every year. Please
              read this guide before heading out — it will keep you safe, legal, and fine-free.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <CheckCircle size={14} />, label: "Helmet required", color: "text-green-600" },
                { icon: <XCircle size={14} />, label: "Zero drunk riding", color: "text-red-600" },
                { icon: <AlertTriangle size={14} />, label: "Licence always required", color: "text-amber-600" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-full shadow-sm"
                >
                  <span className={b.color}>{b.icon}</span>
                  {b.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Rules ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Key Traffic Rules
            </h2>
            <p className="text-gray-500">
              These apply to all riders — tourists included. Ignorance of the law is not accepted
              as an excuse by Thai police.
            </p>
          </motion.div>

          <div className="space-y-5">
            <RuleCard emoji="🪪" title="Driver's Licence" warning delay={0}>
              <p>
                An <strong>International Driving Permit (IDP)</strong> is required to legally ride
                a motorbike in Thailand. A standard foreign licence alone is not sufficient.
                Obtain your IDP before travelling — it is issued by your national automobile
                association in most countries.
              </p>
              <p>
                Fines for riding without a valid licence are high and police checkpoints run
                daily. In the event of an accident without a licence, your travel insurance will
                likely be void. <strong>Always carry your licence when riding.</strong>
              </p>
            </RuleCard>

            <RuleCard emoji="⛑️" title="Helmets Are Mandatory" warning delay={0.05}>
              <p>
                All riders and passengers must wear a helmet at all times. Helmet enforcement has
                increased significantly — checkpoints specifically targeting helmetless riders are
                common, especially on major roads.
              </p>
              <p>
                <strong>AP Bike Center provides a free helmet with every rental.</strong> If you
                need an extra helmet for a passenger, ask us at pickup.
              </p>
            </RuleCard>

            <RuleCard emoji="🍺" title="Drunk Driving — Zero Tolerance" warning delay={0.1}>
              <p>
                Thailand has strict drunk-driving laws with heavy fines and possible imprisonment.
                Breathalyser checks are common at night checkpoints. The legal blood alcohol
                limit is 0.05% — but the safest approach is{" "}
                <strong>do not ride at all after drinking</strong>. This is non-negotiable.
              </p>
              <p>
                Note that drinking alcohol while on or in any vehicle is also strictly prohibited,
                even as a passenger.
              </p>
            </RuleCard>

            <RuleCard emoji="📷" title="Speed Limits & Cameras" delay={0.15}>
              <p>
                Speed cameras are installed on highways and major roads. If you are photographed
                speeding, a fine notice will be issued — authorities can identify you from
                rental records. The fine is significantly higher if not paid promptly.
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-ocean font-bold shrink-0">→</span>
                  <span>City roads: typically 60–80 km/h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean font-bold shrink-0">→</span>
                  <span>Highways: typically 90–100 km/h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean font-bold shrink-0">→</span>
                  <span>Residential / small sois: 40 km/h</span>
                </li>
              </ul>
            </RuleCard>

            <RuleCard emoji="🚦" title="Turning Left at a Red Light" delay={0.2}>
              <p>
                In Thailand, <strong>you may turn left at a red light</strong> unless a sign
                specifically says <em>&ldquo;TURN LEFT WAITING LIGHT&rdquo;</em>. If you see that
                sign, you must wait for the green signal — even for a left turn.
              </p>
              <p>
                Keep the left lane clear for turning vehicles. Blocking left-turn traffic at a
                red light will earn you angry horns from local riders.
              </p>
            </RuleCard>

            <RuleCard emoji="🛣️" title="Road Layout — Ride on the Left" delay={0.25}>
              <p>
                Thailand drives on the <strong>left side of the road</strong>. If you are from a
                right-hand traffic country, take extra care at intersections, roundabouts, and
                when pulling out of side streets. Always check your right shoulder before
                changing lanes.
              </p>
              <p>
                Be aware of median strips on North Pattaya Road and Sukhumvit Road — U-turns and
                right-turns across traffic are only possible at designated points.
              </p>
            </RuleCard>
          </div>
        </div>
      </section>

      {/* ─── Curb Colour Guide ──────────────────────────────────────────────── */}
      <section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-sunset/10 text-sunset font-semibold text-sm px-4 py-2 rounded-full mb-4">
              🎨 Pattaya Road Markings
            </span>
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              What the Curb Colours Mean
            </h2>
            <p className="text-gray-500 leading-relaxed">
              The painted kerbs you see everywhere in Pattaya are not just decorative — each
              colour combination has a legal meaning for stopping and parking. You will also
              notice these same stripe patterns on the AP Bike Center website as a nod to local
              street culture.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            <CurbSwatch
              colorA="#FFD700"
              colorB="#ffffff"
              label="Yellow & White"
              rule="No parking during designated hours. You may stop briefly to drop off or pick up passengers and luggage — but do not leave the bike unattended."
              icon="⚠️"
            />
            <CurbSwatch
              colorA="#CC1515"
              colorB="#ffffff"
              label="Red & White"
              rule="No stopping or parking at any time within the marked boundaries. This is a hard restriction — not even briefly. Move on immediately."
              icon="🚫"
            />
            <CurbSwatch
              colorA="#222222"
              colorB="#ffffff"
              label="Black & White"
              rule="Conditional parking — check for additional signs indicating time restrictions or odd/even day rules. Without a restriction sign, parking is generally permitted."
              icon="✅"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 bg-ocean/5 border border-ocean/15 rounded-2xl p-5 flex items-start gap-3"
          >
            <Info size={18} className="text-ocean shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              When parking your rental bike, always lock the handlebar and choose a yellow/white
              or black/white kerb. Never park on red/white. Illegally parked vehicles in Pattaya
              can be towed quickly, especially near beach and shopping areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Fuel Guide ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-ocean/10 text-ocean font-semibold text-sm px-4 py-2 rounded-full mb-4">
              <Fuel size={14} /> Fuelling Up
            </span>
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Gas Stations in Pattaya
            </h2>
            <p className="text-gray-500">
              There are no petrol stations in the very centre of Pattaya — the nearest ones are
              slightly outside the main tourist strip.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-sand rounded-3xl p-6 space-y-4"
            >
              <h3 className="font-display font-bold text-gray-900 text-lg flex items-center gap-2">
                ⛽ At the Pump
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-ocean shrink-0">1.</span>
                  <p>Open the fuel cap yourself before approaching the attendant.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-ocean shrink-0">2.</span>
                  <p>
                    Ask for <strong className="text-gray-800">&ldquo;91&rdquo;</strong>{" "}
                    (say: <em>Gao Nung</em>). This is the standard unleaded petrol used in all
                    our bikes.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-ocean shrink-0">3.</span>
                  <p>
                    To fill the tank completely say{" "}
                    <strong className="text-gray-800">&ldquo;Temm Tung&rdquo;</strong>{" "}
                    (full tank). Most Pattaya stations are self-service — you pump yourself and
                    pay at the machine.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-ocean shrink-0">4.</span>
                  <p>Close the fuel cap securely after filling.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-sand rounded-3xl p-6 space-y-4"
            >
              <h3 className="font-display font-bold text-gray-900 text-lg flex items-center gap-2">
                🍶 Roadside Fuel Bottles
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                In areas far from a proper station you will see small shops selling petrol in
                recycled whiskey or water bottles on a rack outside. This is common throughout
                Thailand — the fuel is genuine, just sold informally. Price per litre is slightly
                higher than at a station.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-2">
                <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Be careful on <strong>North Pattaya Road</strong> and{" "}
                  <strong>Sukhumvit Road</strong> — median strips mean you cannot turn right into
                  a station. Plan ahead and enter from the correct side.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Quick Reference ────────────────────────────────────────────────── */}
      <section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              Quick Reference
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { ok: true,  text: "Carry your International Driving Permit at all times" },
              { ok: true,  text: "Wear your helmet — both rider and passenger" },
              { ok: true,  text: "Lock the handlebar when parking" },
              { ok: true,  text: "Ask for '91' (Gao Nung) at petrol stations" },
              { ok: true,  text: "Left turns at red lights are allowed (unless signed)" },
              { ok: true,  text: "Ride on the left side of the road" },
              { ok: false, text: "No riding after drinking — zero tolerance" },
              { ok: false, text: "No riding without a valid helmet" },
              { ok: false, text: "Do not leave your key in the bike when parked" },
              { ok: false, text: "No parking on red/white kerbs — ever" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-soft"
              >
                {item.ok ? (
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-ocean text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-4xl mb-4">Ready to Ride Safely?</h2>
            <p className="text-white/80 text-lg mb-8">
              You know the rules — now pick your bike. Every rental comes with a free helmet,
              full tank of fuel, and 24-hour roadside backup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/bikes"
                className="inline-flex items-center gap-2.5 bg-white text-ocean font-bold text-lg px-10 py-4 rounded-2xl hover:bg-sand transition-colors shadow-lg"
              >
                <span>🏍️</span>
                View All Bikes
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 border-2 border-white/80 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={18} />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
