"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch the list of images from the server — works with any filename
  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setImages(data.images ?? []))
      .catch(() => setImages([]));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((images.length + index) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, paused]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-sunset/10 text-sunset font-semibold text-sm px-4 py-2 rounded-full mb-4">
            📸 Our Shop
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See AP Bike Center
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Come visit us on Second Road — our bikes are ready and our team is waiting to help
            you find the perfect ride.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-card bg-gray-900"
            style={{ aspectRatio: "16 / 9" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={images[current]}
                src={images[current]}
                alt={`AP Bike Center — photo ${current + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Pattaya curb stripe */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-3.5"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 48px, #ffffff 48px, #ffffff 96px)",
                opacity: 0.88,
              }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => goTo(current - 1)}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => goTo(current + 1)}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2.5 bg-white"
                        : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="absolute top-4 right-4 z-10 glass-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {current + 1} / {images.length}
            </div>
          </div>

          {images.length >= 3 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setCurrent(i)}
                  aria-label={`Thumbnail ${i + 1}`}
                  className={`shrink-0 w-16 h-12 rounded-xl overflow-hidden transition-all duration-200 ${
                    i === current
                      ? "ring-2 ring-ocean ring-offset-2 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
