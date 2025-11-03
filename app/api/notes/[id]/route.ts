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
 * @param request The standard Request object
 * @param context The route context containing dynamic segments
 */
export async function DELETE(
  request: Request,
  context: Context // 👈 Simplified type to prevent Vercel Build error
) {
  // Access the id from context.params
  const { id } = context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Note ID is required." },
      { status: 400 }
    );
  }

  const wasDeleted = deleteNote(id);

  if (wasDeleted) {
    // 204 No Content is standard for successful deletion
    return new NextResponse(null, { status: 204 });
  } else {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }
}
