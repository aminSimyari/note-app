// app/api/notes/[id]/route.ts

import { NextResponse } from "next/server";
import { deleteNote } from "@/lib/data-store";

// Using a simplified Context type for better build compatibility
type Context = {
  params: {
    id: string;
  };
};

/**
 * Handles DELETE requests to /api/notes/:id
 */
export async function DELETE(request: Request, context: Context) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Note ID is required." },
      { status: 400 }
    );
  }

  // Call the function from the data store
  const wasDeleted = deleteNote(id);

  if (wasDeleted) {
    // CRITICAL FIX: Must return 204 No Content for successful deletion
    // This is necessary for the frontend (NotesList.tsx) to recognize success.
    return new NextResponse(null, { status: 204 });
  } else {
    // Note not found (404)
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }
}
