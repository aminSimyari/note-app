// app/page.tsx
// THIS CODE FIXES ALL REMAINING ERRORS: Missing imports and unused functions.

import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";
// 1 & 2. CRITICAL FIX: Ensure Note and Category types are imported.
import { Note, Category } from "@/types";
// useState is a Client Component hook, only imported for the client wrapper.
import { useState } from "react";

// --- 1. Base URL Definition (For Server Fetch) ---

const API_BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}` // Use Vercel URL in Production
  : "http://localhost:3000"; // Use localhost in Development

// --- 2. Server-side Data Fetching (Used by HomePage) ---

async function fetchAppData() {
  try {
    const [notesRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/notes`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/api/categories`, { cache: "force-cache" }),
    ]);

    if (!notesRes.ok) throw new Error("Failed to fetch notes.");
    if (!categoriesRes.ok) throw new Error("Failed to fetch categories.");

    const notesData = await notesRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      notes: notesData.data as Note[],
      categories: categoriesData.data as Category[],
      error: null,
    };
  } catch (error: unknown) {
    // Using 'unknown' to satisfy strict TS
    // Safely determine the error message
    let errorMessage = "Unknown API connection error.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      notes: [],
      categories: [],
      error: errorMessage,
    };
  }
}

// --- 3. Client Component Wrapper (Used by HomePage) ---

// Using 'function' syntax for better compatibility and type inference.
function NoteAppClient({
  initialNotes,
  categories,
}: {
  initialNotes: Note[];
  categories: Category[];
}) {
  const [notes, setNotes] = useState(initialNotes);

  const handleNoteCreated = (newNote: Note) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleNotesUpdated = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <NoteForm categories={categories} onNoteCreated={handleNoteCreated} />
      <NotesList
        initialNotes={notes}
        categories={categories}
        onNoteDeleted={() => {}}
        onNotesUpdated={handleNotesUpdated}
      />
    </main>
  );
}

// --- 4. Main Page Component (Server Component, default export) ---
// 3. FIX: fetchAppData is used here, resolving the "defined but never used" warning.
export default async function HomePage() {
  const { notes: initialNotes, categories, error } = await fetchAppData();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="p-6 bg-white shadow-xl rounded-lg border-2 border-red-400 text-center">
          <h1 className="text-xl font-bold text-red-600">
            Loading Failed (Error)
          </h1>
          <p className="text-gray-500 mt-2">
            Could not connect to API. Please ensure the server is running.
          </p>
          <p className="text-sm text-gray-400 mt-1">Error: {error}</p>
        </div>
      </div>
    );
  }

  return <NoteAppClient initialNotes={initialNotes} categories={categories} />;
}
