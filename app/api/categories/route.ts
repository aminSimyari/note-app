// app/api/categories/route.ts

import { NextResponse } from "next/server";
import { getCategories } from "@/lib/data-store";

/**
 * Handles GET requests to /api/categories
 * @returns List of categories
 */
export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
