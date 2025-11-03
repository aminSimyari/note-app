// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { getCategories } from "@/lib/data-store";

export async function GET() {
  const cats = getCategories();
  return NextResponse.json({ data: cats }, { status: 200 });
}
