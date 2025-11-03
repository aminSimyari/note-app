import { NextResponse } from "next/server";
import { deleteNote } from "@/lib/data-store";

interface Context {
  params: { id: string };
}

export async function DELETE(_req: Request, context: Context) {
  const { id } = context.params;
  const deleted = deleteNote(id);

  if (deleted) return new NextResponse(null, { status: 204 });
  return NextResponse.json({ error: "Note not found" }, { status: 404 });
}
