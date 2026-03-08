"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Moon,
} from "lucide-react";
import type { Bike } from "./BikeGrid";
import { useState } from "react";

// ─── Business hours constraint ───────────────────────────────────────────────
const OPEN_HOUR = 10;
const CLOSE_HOUR = 18;
const CLOSE_MINUTE = 59;

function isWithinBusinessHours(timeStr: string): boolean {
  const [h, m] = timeStr.split(":").map(Number);
  if (h < OPEN_HOUR) return false;
  if (h > CLOSE_HOUR) return false;
  if (h === CLOSE_HOUR && m > CLOSE_MINUTE) return false;
  return true;
}

// ─── Zod schema ──────────────────────────────────────────────────────────────
const bookingSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Please enter your full name")
      .max(80, "Name too long"),
    phone: z
      .string()
      .min(6, "Phone number is required")
      .max(20, "Phone number too long"),
    hotelName: z.string().min(1, "Please enter your hotel or accommodation name"),
    pickupDate: z.string().min(1, "Pickup date is required"),
    pickupTime: z.string().min(1, "Pickup time is required"),
    returnDate: z.string().min(1, "Return date is required"),
    returnTime: z.string().min(1, "Return time is required"),
    days: z.number().min(1),
    guaranteedModel: z.boolean(),
    receiptNeeded: z.boolean(),
    receiptName: z.string().optional(),
    specialRequests: z.string().max(300).optional(),
  })
  .superRefine((data, ctx) => {
    // Time constraints
    if (data.pickupTime && !isWithinBusinessHours(data.pickupTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pickupTime"],
        message: "Enjoy your evening! We open at 10:00 AM and close at 7:00 PM 🌙",
      });
    }
    if (data.returnTime && !isWithinBusinessHours(data.returnTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["returnTime"],
        message: "Return must be before 7:00 PM. We close at 19:00 🌴",
      });
    }
    // Return must be after pickup
    if (data.pickupDate && data.returnDate) {
      const pickup = new Date(`${data.pickupDate}T${data.pickupTime || "10:00"}`);
      const ret = new Date(`${data.returnDate}T${data.returnTime || "18:00"}`);
      if (ret <= pickup) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["returnDate"],
          message: "Return must be after pickup",
        });
      }
    }
    // Receipt name required if receipt needed
    if (data.receiptNeeded && !data.receiptName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["receiptName"],
        message: "Please enter the name for the receipt",
      });
    }
  });

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export default function BookingForm({ bike, isOpen, onClose }: BookingFormProps) {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupDate: today,
      returnDate: today,
      pickupTime: "10:00",
      returnTime: "17:00",
      days: 1,
      guaranteedModel: false,
      receiptNeeded: false,
    },
  });

  const pickupDate = watch("pickupDate");
  const pickupTime = watch("pickupTime");
  const returnDate = watch("returnDate");
  const returnTime = watch("returnTime");
  const receiptNeeded = watch("receiptNeeded");
  const guaranteedModel = watch("guaranteedModel");

  // Auto-calculate days
  useEffect(() => {
    if (pickupDate && returnDate && pickupTime && returnTime) {
      const start = new Date(`${pickupDate}T${pickupTime}`);
      const end = new Date(`${returnDate}T${returnTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      setValue("days", diffDays);
    }
  }, [pickupDate, pickupTime, returnDate, returnTime, setValue]);

  const days = watch("days");
  const basePrice = bike ? bike.pricePerDay * days : 0;
  const addonPrice = guaranteedModel ? 100 : 0;
  const totalPrice = basePrice + addonPrice;

  const onSubmit = async (data: BookingFormData) => {
    setSubmitState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-line", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, bike }),
      });
      if (!res.ok) throw new Error("Failed to send booking");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMsg("Something went wrong. Please call us or try again.");
    }
  };

  // Close with Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      reset();
      setSubmitState("idle");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset]);

  // Business hours hint
  const timeHint = (field: "pickupTime" | "returnTime") => {
    const val = watch(field);
    if (!val) return null;
    if (!isWithinBusinessHours(val)) {
      return (
        <div className="flex items-start gap-2 bg-sunset/10 border border-sunset/20 rounded-xl px-3 py-2.5 mt-2">
          <Moon size={15} className="text-sunset mt-0.5 shrink-0" />
          <p className="text-xs text-sunset font-medium">
            Enjoy your evening! We open at 10:00 AM and close at 7:00 PM 🌙
          </p>
        </div>
      );
    }
    return null;
  };

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
            className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] flex flex-col glass rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-glow"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-ocean flex items-center justify-center text-white text-lg font-bold">
                  🏍️
                </div>
                <div>
                  <h2 className="font-display font-bold text-gray-900 text-lg leading-tight">
                    {bike ? bike.name : "Book a Bike"}
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

            {/* Scrollable Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            >
              {submitState === "success" ? (
                <SuccessScreen bike={bike} onClose={onClose} />
              ) : (
                <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Personal info */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <User size={15} className="text-ocean" />
                      Your Details
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormField
                        label="Full Name"
                        error={errors.fullName?.message}
                      >
                        <input
                          {...register("fullName")}
                          placeholder="e.g. John Smith"
                          className={inputClass(!!errors.fullName)}
                        />
                      </FormField>

                      <FormField
                        label="Phone / WhatsApp"
                        error={errors.phone?.message}
                      >
                        <div className="relative">
                          <Phone
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            {...register("phone")}
                            placeholder="+66 xx xxx xxxx"
                            className={`${inputClass(!!errors.phone)} pl-9`}
                          />
                        </div>
                      </FormField>
                    </div>

                    {/* Hotel search */}
                    <FormField
                      label="Hotel / Accommodation"
                      error={errors.hotelName?.message}
                    >
                      <div className="relative">
                        <Search
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          {...register("hotelName")}
                          placeholder="Search your hotel name..."
                          className={`${inputClass(!!errors.hotelName)} pl-9`}
                        />
                        <MapPin
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ocean/50"
                        />
                      </div>
                    </FormField>
                  </fieldset>

                  {/* Dates & times */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar size={15} className="text-ocean" />
                      Rental Period
                      <span className="ml-auto text-xs font-normal text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        Open 10:00 – 19:00
                      </span>
                    </legend>

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        label="Pickup Date"
                        error={errors.pickupDate?.message}
                      >
                        <input
                          type="date"
                          {...register("pickupDate")}
                          min={today}
                          className={inputClass(!!errors.pickupDate)}
                        />
                      </FormField>

                      <FormField
                        label="Pickup Time"
                        error={errors.pickupTime?.message}
                      >
                        <input
                          type="time"
                          {...register("pickupTime")}
                          min="10:00"
                          max="19:00"
                          className={inputClass(!!errors.pickupTime)}
                        />
                      </FormField>
                    </div>
                    {timeHint("pickupTime")}

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        label="Return Date"
                        error={errors.returnDate?.message}
                      >
                        <input
                          type="date"
                          {...register("returnDate")}
                          min={pickupDate || today}
                          className={inputClass(!!errors.returnDate)}
                        />
                      </FormField>

                      <FormField
                        label="Return Time"
                        error={errors.returnTime?.message}
                      >
                        <input
                          type="time"
                          {...register("returnTime")}
                          min="10:00"
                          max="19:00"
                          className={inputClass(!!errors.returnTime)}
                        />
                      </FormField>
                    </div>
                    {timeHint("returnTime")}

                    {/* Duration pill */}
                    <div className="flex items-center gap-2 bg-ocean/10 rounded-xl px-4 py-2.5">
                      <Calendar size={15} className="text-ocean" />
                      <span className="text-sm text-ocean font-semibold">
                        {days} day{days !== 1 ? "s" : ""} rental
                      </span>
                      <span className="ml-auto text-sm font-bold text-ocean">
                        ฿{basePrice.toLocaleString()}
                      </span>
                    </div>
                  </fieldset>

                  {/* Add-ons */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-gray-700 mb-3">
                      Add-Ons & Options
                    </legend>

                    {/* Guaranteed model */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-transparent bg-sand hover:border-ocean/30 cursor-pointer transition-all group has-[:checked]:border-ocean has-[:checked]:bg-ocean/5">
                      <input
                        type="checkbox"
                        {...register("guaranteedModel")}
                        className="mt-0.5 w-4 h-4 accent-ocean rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-900">
                            Guaranteed Model Strategy
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

                    {/* Receipt */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-transparent bg-sand hover:border-ocean/30 cursor-pointer transition-all has-[:checked]:border-ocean has-[:checked]:bg-ocean/5">
                      <input
                        type="checkbox"
                        {...register("receiptNeeded")}
                        className="mt-0.5 w-4 h-4 accent-ocean rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-gray-500" />
                          <span className="font-semibold text-sm text-gray-900">
                            Receipt Needed
                          </span>
                          <span className="text-xs text-gray-400 font-normal">
                            (Free)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          We&apos;ll prepare an official rental receipt for you.
                        </p>
                      </div>
                    </label>

                    <AnimatePresence>
                      {receiptNeeded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <FormField
                            label="Name on Receipt"
                            error={errors.receiptName?.message}
                          >
                            <input
                              {...register("receiptName")}
                              placeholder="Full name for the receipt"
                              className={inputClass(!!errors.receiptName)}
                            />
                          </FormField>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </fieldset>

                  {/* Special requests */}
                  <FormField
                    label="Special Requests (optional)"
                    error={errors.specialRequests?.message}
                  >
                    <textarea
                      {...register("specialRequests")}
                      placeholder="Any other notes for us..."
                      rows={2}
                      className={`${inputClass(false)} resize-none`}
                    />
                  </FormField>

                  {/* Error */}
                  {submitState === "error" && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                      <p className="text-sm text-red-600">{errorMsg}</p>
                    </div>
                  )}

                  {/* Hidden days field */}
                  <input type="hidden" {...register("days", { valueAsNumber: true })} />
                </form>
              )}
            </div>

            {/* Footer */}
            {submitState !== "success" && (
              <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-white/80 backdrop-blur-sm">
                {/* Price summary */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-gray-500">
                    ฿{bike?.pricePerDay}/day × {days} day{days !== 1 ? "s" : ""}
                    {addonPrice > 0 && ` + ฿${addonPrice} add-on`}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Estimated total</p>
                    <p className="font-display font-bold text-xl text-ocean">
                      ฿{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  form="booking-form"
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full bg-gradient-ocean text-white font-bold py-3.5 px-6 rounded-2xl hover:opacity-90 active:scale-[0.98] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 text-base"
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending your booking...
                    </>
                  ) : (
                    <>
                      <span>🏍️</span>
                      Send Booking Request via LINE
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  We&apos;ll confirm within minutes during business hours
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-sand border-2 ${
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-transparent focus:border-ocean"
  } rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors duration-200 focus:bg-white`;
}

function SuccessScreen({ bike, onClose }: { bike: Bike | null; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-8 gap-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
      >
        <CheckCircle2 size={40} className="text-green-500" />
      </motion.div>

      <div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
          Booking Sent! 🎉
        </h3>
        <p className="text-gray-500 max-w-sm">
          Your {bike?.name} booking request has been sent via LINE. We&apos;ll
          confirm within minutes during business hours.
        </p>
      </div>

      <div className="bg-sand rounded-2xl p-4 w-full text-left space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span>Second Road, Pattaya (between Soi 8 & Soi 9)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>🕙</span>
          <span>Open 10:00 AM – 7:00 PM daily</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>💳</span>
          <span>Copy & Cash only — no passport deposit</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gradient-ocean text-white font-bold py-3.5 px-6 rounded-2xl hover:opacity-90 transition-all"
      >
        Close
      </button>
    </motion.div>
  );
}
