import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

export async function GET() {
  // 🔹 Log for checking GET requests
  console.log("📥 Fetching notes...");
  return NextResponse.json({ data: getNotes() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category } = body;

    if (!title)
      return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newNote = createNote({ title, content, category });

    // 🔹 Log for checking POST requests (when a new note is created)
    console.log("✅ New note created:", newNote);

    return NextResponse.json({ data: newNote }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
