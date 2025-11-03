import { Note, Category } from "./types";
import { v4 as uuid } from "uuid";

let notes: Note[] = [];

const categories: Category[] = [
  { id: "cat-1", name: "Work" },
  { id: "cat-2", name: "Personal" },
  { id: "cat-3", name: "Ideas" },
];

export function getNotes(): Note[] {
  return notes;
}

export function createNote(data: {
  title: string;
  content?: string;
  category?: string;
}): Note {
  const newNote: Note = {
    id: uuid(),
    title: data.title,
    content: data.content || "",
    category: data.category || "cat-1",
    createdAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  return newNote;
}

export function deleteNote(id: string): boolean {
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return notes.length < initialLength;
}

export function getCategories(): Category[] {
  return categories;
}
