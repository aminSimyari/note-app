// app/api/notes/[id]/route.ts
// FINAL TYPE-SAFE FIX for Next.js Route Handler

import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
import { deleteNote } from "@/lib/data-store";

// Define the standard Context structure for dynamic routes
interface Context {
  params: {
    id: string;
  };
}

/**
 * Handles DELETE requests to /api/notes/:id
 * Uses NextRequest for robust type handling of context.
 */
export async function DELETE(
  request: NextRequest, // Use NextRequest for better context compatibility
  context: Context // Use the defined interface
) {
  // Read the ID directly from context.params
  const id: string = context.params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Note ID is required." },
      { status: 400 }
    );
  }

  const wasDeleted = deleteNote(id);

  if (wasDeleted) {
    // 204 No Content for success
    return new NextResponse(null, { status: 204 });
  } else {
    // 404 Not Found if deleteNote returns false
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }
}
