import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

export async function GET() {
  console.log("📥 GET /api/notes called"); // چک می‌کنه که ریکوئست GET اومده
  const notes = getNotes();
  return NextResponse.json({ data: notes });
}

export async function POST(request: Request) {
  console.log("➡️ POST /api/notes hit"); // وقتی فرم ارسال میشه، این باید توی کنسول بیاد

  try {
    const body = await request.json();
    console.log("📝 Received POST body:", body); // چک کن ببینی دیتا درست می‌رسه یا نه

    const { title, content, category } = body;

    if (!title) {
      console.warn("⚠️ Missing title field!");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newNote = createNote({ title, content, category });
    console.log("✅ New note created:", newNote);

    return NextResponse.json({ data: newNote }, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /api/notes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
