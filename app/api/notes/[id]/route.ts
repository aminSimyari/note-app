// app/api/notes/[id]/route.ts
// THIS IS THE CRITICAL FIX for the Type Error in Vercel build.

import { NextResponse } from "next/server";
import { deleteNote } from "@/lib/data-store";

// تعریف ساده و مستقیم نوع داده برای Params
type Context = {
  params: {
    id: string;
  };
};

/**
 * Handles DELETE requests to /api/notes/:id
 * @param request The standard Request object
 * @param context The route context (MUST match the defined type)
 */
export async function DELETE(
  request: Request,
  context: Context // 👈 استفاده از تایپ ساده Context
) {
  // دسترسی مستقیم به id از context.params
  const { id } = context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Note ID is required." },
      { status: 400 }
    );
  }

  const wasDeleted = deleteNote(id);

  if (wasDeleted) {
    // 204 No Content
    return new NextResponse(null, { status: 204 });
  } else {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }
}
