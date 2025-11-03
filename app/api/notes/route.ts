// app/api/notes/route.ts

import { NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/data-store";

export async function GET() {
  const notes = getNotes();
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json({ data: notes }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, categoryId } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    const newNote = createNote({ title, content, categoryId });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ data: newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data format or internal error." },
      { status: 500 }
    );
  }
}
