// lib/data-store.ts

import { Note, Category } from "@/types";
// CRITICAL FIX: Use the reliable 'uuid' library for ID generation
import { v4 as uuid } from "uuid";

// Initial mock data definitions
const categories: Category[] = [
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
];

let notes: Note[] = [
  {
    id: "a1",
    title: "Grocery List",
    content: "Bread, milk, fruits, and vegetables",
    categoryId: "1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b2",
    title: "Next.js Project",
    content: "Finish API section and start UI development.",
    categoryId: "2",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ************* Notes Logic *************

export function getNotes() {
  return notes;
}

export function createNote(data: {
  title: string;
  content?: string;
  categoryId?: string;
}): Note {
  // Use uuid() for guaranteed ID format compatibility
  const newNote: Note = {
    id: uuid(),
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
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

// ************* Categories Logic *************

export function getCategories() {
  return categories;
}
