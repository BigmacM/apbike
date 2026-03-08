import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

const VALID_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  const dir = path.join(process.cwd(), "public", "images", "gallery");
  try {
    const files = await readdir(dir);
    const images = files
      .filter((f) => !f.startsWith(".") && VALID_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/gallery/${encodeURIComponent(f)}`);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
