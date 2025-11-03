// app/api/notes/route.ts

import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

/**
 * Handles GET requests to /api/notes (Get all notes)
 */
export async function GET() {
  const notes = getNotes();
  // Simulate network latency for loading state
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json({ data: notes }, { status: 200 });
}

/**
 * Handles POST requests to /api/notes (Create a new note)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, categoryId } = body;

    // Simple validation
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    const newNote = createNote({ title, content, categoryId });
    // Simulate server processing time for button loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ data: newNote }, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data format or internal error." },
      { status: 500 }
    );
  }
}
