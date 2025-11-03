import { Note, Category } from "../types";
// If VS Code gives an error here, try changing the path to '@/types':
// import { Note, Category } from '@/types';

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
  // crypto.randomUUID generates a unique ID
  const newNote: Note = {
    id: crypto.randomUUID(),
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  return newNote;
}

export function deleteNote(id: string): boolean {
  const initialLength = notes.length;
  // Filter out the note with the matching ID
  notes = notes.filter((note) => note.id !== id);
  return notes.length < initialLength; // True if an item was removed
}

// ************* Categories Logic *************

export function getCategories() {
  return categories;
}
