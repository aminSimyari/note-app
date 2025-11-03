// app/api/notes/[id]/route.ts

import { NextResponse } from "next/server";
import { deleteNote } from "@/lib/data-store";

/**
 * Handles DELETE requests to /api/notes/:id
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
