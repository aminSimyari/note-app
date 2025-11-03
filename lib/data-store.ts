// lib/data-store.ts

import { Note, Category } from "@/types";

// Initial mock data definitions (categories are static)
const categories: Category[] = [
  { id: "1", name: "Personal" },
  { id: "2", name: "Work" },
  { id: "3", name: "Ideas" },
];

// CRITICAL FIX: The notes array MUST be defined with 'let'
// so the deleteNote function can reassign the array.
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
  // Generates a unique ID
  const newNote: Note = {
    id: crypto.randomUUID(),
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
    createdAt: new Date().toISOString(),
  };

  notes.unshift(newNote); // Add to the beginning of the list
  return newNote;
}

// CRITICAL FIX: This function reassigns the 'notes' array
export function deleteNote(id: string): boolean {
  const initialLength = notes.length;
  // Filter out the note with the matching ID
  notes = notes.filter((note) => note.id !== id);
  // Returns true if the length changed (note was deleted)
  return notes.length < initialLength;
}

// ************* Categories Logic *************

export function getCategories() {
  return categories;
}
