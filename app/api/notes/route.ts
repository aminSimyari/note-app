// app/api/notes/route.ts

import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

/**
 * Handles GET requests to /api/notes
 */
export async function GET() {
  try {
    const notes = getNotes();
    // Return notes under the 'data' key for consistency
    return NextResponse.json({ data: notes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Internal Server Error: Failed to fetch notes." },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to /api/notes
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, categoryId } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string." },
        { status: 400 }
      );
    }

    const newNote = createNote({ title, content, categoryId });

    // CRITICAL FIX: Ensure the response contains the new note under the 'data' key
    // to satisfy the client component (NoteForm/NoteAppWrapper).
    return NextResponse.json(
      {
        message: "Note created successfully.",
        data: newNote,
      },
      { status: 201 } // Status 201 Created
    );
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Internal Server Error: Failed to process request." },
      { status: 500 }
    );
  }
}
