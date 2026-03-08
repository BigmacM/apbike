import { NextRequest, NextResponse } from "next/server";

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN || "";
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const LINE_GROUP_ID = process.env.LINE_GROUP_ID || "";

interface BookingPayload {
  fullName: string;
  phone: string;
  hotelName: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
  guaranteedModel: boolean;
  receiptNeeded: boolean;
  receiptName?: string;
  specialRequests?: string;
  bike: {
    name: string;
    cc: string;
    category: string;
    pricePerDay: number;
  } | null;
}

function formatBookingMessage(data: BookingPayload): string {
  const addonPrice = data.guaranteedModel ? 100 : 0;
  const basePrice = data.bike ? data.bike.pricePerDay * data.days : 0;
  const total = basePrice + addonPrice;

  const lines = [
    "🏍️ ═══════════════════════════",
    "  NEW BOOKING REQUEST",
    "  AP Bike Center Pattaya",
    "══════════════════════════════",
    "",
    `📋 BIKE: ${data.bike?.name ?? "Not specified"} (${data.bike?.cc ?? ""})`,
    `   Category: ${data.bike?.category ?? ""}`,
    "",
    "👤 CUSTOMER",
    `   Name  : ${data.fullName}`,
    `   Phone : ${data.phone}`,
    `   Hotel : ${data.hotelName}`,
    "",
    "📅 RENTAL PERIOD",
    `   Pickup : ${formatDate(data.pickupDate)} at ${data.pickupTime}`,
    `   Return : ${formatDate(data.returnDate)} at ${data.returnTime}`,
    `   Duration: ${data.days} day${data.days !== 1 ? "s" : ""}`,
    "",
    "💰 PRICING",
    `   Base   : ฿${data.bike?.pricePerDay.toLocaleString() ?? 0}/day × ${data.days} = ฿${basePrice.toLocaleString()}`,
  ];

  if (data.guaranteedModel) {
    lines.push(`   Add-on : Guaranteed Model +฿100`);
  }

  lines.push(`   TOTAL  : ฿${total.toLocaleString()}`);
  lines.push("");
  lines.push("✅ ADD-ONS");
  lines.push(
    `   Guaranteed Model : ${data.guaranteedModel ? "YES (+฿100)" : "No"}`
  );
  lines.push(`   Receipt Needed   : ${data.receiptNeeded ? "YES" : "No"}`);

  if (data.receiptNeeded && data.receiptName) {
    lines.push(`   Receipt Name     : ${data.receiptName}`);
  }

  if (data.specialRequests?.trim()) {
    lines.push("");
    lines.push("📝 SPECIAL REQUESTS");
    lines.push(`   ${data.specialRequests}`);
  }

  lines.push("");
  lines.push("──────────────────────────────");
  lines.push("⚡ Please reply to confirm");
  lines.push("══════════════════════════════");

  return lines.join("\n");
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

async function sendViaLineNotify(message: string): Promise<{ ok: boolean; error?: string }> {
  if (!LINE_NOTIFY_TOKEN) {
    return { ok: false, error: "LINE_NOTIFY_TOKEN not configured" };
  }

  const res = await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ message }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }
  return { ok: true };
}

async function sendViaLineMessaging(message: string): Promise<{ ok: boolean; error?: string }> {
  if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_GROUP_ID) {
    return { ok: false, error: "LINE Messaging API not configured" };
  }

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: LINE_GROUP_ID,
      messages: [{ type: "text", text: message }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const data: BookingPayload = await req.json();

    // Validate required fields
    if (!data.fullName || !data.phone || !data.hotelName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = formatBookingMessage(data);

    // Try LINE Notify first, fall back to Messaging API
    let result = await sendViaLineNotify(message);

    if (!result.ok) {
      result = await sendViaLineMessaging(message);
    }

    if (!result.ok) {
      console.error("LINE send failed:", result.error);
      // Still return 200 if LINE is just not configured (dev environment)
      if (
        result.error?.includes("not configured") &&
        process.env.NODE_ENV === "development"
      ) {
        console.log("=== BOOKING (dev mode) ===\n" + message);
        return NextResponse.json({
          success: true,
          dev: true,
          message: "Logged to console (LINE not configured)",
        });
      }
      return NextResponse.json(
        { error: "Failed to send LINE message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-line error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
