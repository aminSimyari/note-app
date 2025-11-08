// Import necessary modules from Next.js and your data store
import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

// 🟢 Handle GET requests (fetching all notes)
export async function GET() {
  console.log("📥 Fetching notes..."); // Log to check GET in server logs

  const notes = getNotes();

  return NextResponse.json({
    message: "✅ Backend is working fine! (GET /api/notes)",
    count: notes.length,
    data: notes,
  });
}

// 🟢 Handle POST requests (creating a new note)
export async function POST(request: Request) {
  console.log("➡️ POST /api/notes hit");

  try {
    const body = await request.json();
    const { title, content, category } = body;

    console.log("📝 Received POST body:", body);

    if (!title) {
      console.warn("⚠️ Missing title in request body");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newNote = createNote({ title, content, category });

    console.log("✅ New note created:", newNote);

    // Return visible message for browser + JSON data
    return NextResponse.json({
      message: "✅ Backend is working fine! (Note successfully created)",
      data: newNote,
    });
  } catch (error) {
    console.error("❌ Error creating note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
