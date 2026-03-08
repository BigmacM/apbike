"use client";

import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.2!2d100.888!3d12.934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102ab5e38d9c4c7%3A0x0!2zMTLCsDU2JzAyLjQiTiAxMDDCsDUzJzE2LjgiRQ!5e0!3m2!1sen!2sth!4v1699000000000";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=AP+Bike+Center+Pattaya+Second+Road+Soi+8";

/**
 * Shows a lightweight static card until the user explicitly clicks
 * "Load map" — this prevents the Google Maps iframe from making dozens
 * of background requests on page load, which caused the browser's
 * loading spinner to spin indefinitely.
 */
export default function MapCard({ minHeight = 320 }: { minHeight?: number }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="AP Bike Center Location"
        src={EMBED_SRC}
        width="100%"
        style={{ border: 0, minHeight, height: "100%" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 cursor-pointer group"
      style={{ minHeight }}
      onClick={() => setLoaded(true)}
    >
      {/* Map-grid background */}
      <div
        className="absolute inset-0 bg-gray-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,168,204,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,168,204,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />
      {/* Faint road lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-0 right-0 h-7 bg-white/55 -translate-y-1/2" />
        <div className="absolute inset-y-0 left-[38%] w-5 bg-white/40" />
      </div>

      {/* Pin */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-ocean flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <MapPin size={30} className="text-white" />
        </div>
        <div>
          <p className="font-display font-bold text-gray-900 text-lg">AP Bike Center</p>
          <p className="text-gray-600 text-sm mt-0.5">Second Road, Pattaya City</p>
          <p className="text-gray-400 text-xs mt-0.5">Between Soi 8 &amp; Soi 9</p>
        </div>

        {/* Click to load */}
        <button
          className="mt-1 inline-flex items-center gap-2 bg-ocean text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md"
          aria-label="Load interactive map"
        >
          📍 Load Interactive Map
        </button>

        {/* External link — doesn't trigger spinner */}
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-ocean transition-colors"
        >
          <ExternalLink size={12} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
