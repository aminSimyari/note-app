// app/page.tsx

import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";
import { Note, Category } from "@/types";
// * باید مطمئن شوید که این import فقط برای NoteAppClient استفاده می شود *
import { useState } from "react";

// --- 1. Base URL Definition (For Server Fetch) ---

const API_BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// --- 2. Server-side Data Fetching ---

async function fetchAppData() {
  try {
    const [notesRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/notes`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/api/categories`, { cache: "force-cache" }),
    ]);
    // ... (rest of fetch logic)
    if (!notesRes.ok) throw new Error("Failed to fetch notes.");
    if (!categoriesRes.ok) throw new Error("Failed to fetch categories.");

    const notesData = await notesRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      notes: notesData.data as Note[],
      categories: categoriesData.data as Category[],
      error: null,
    };
  } catch (error: any) {
    return {
      notes: [],
      categories: [],
      error: (error as Error).message || "Unknown API connection error.",
    };
  }
}

// --- 3. Client Component Wrapper (MUST use 'useState') ---
// This is a regular functional component (client component)
const NoteAppClient = ({
  initialNotes,
  categories,
}: {
  initialNotes: Note[];
  categories: Category[];
}) => {
  // useState is only used here, NOT in HomePage
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
};

// --- 4. Main Page Component (Server Component, default export) ---
// This function must be the default export and must return a JSX element (the Client Component).
export default async function HomePage() {
  const { notes: initialNotes, categories, error } = await fetchAppData();

  if (error) {
    // If there is an error, return the error JSX
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

  // If successful, return the Client Component
  return <NoteAppClient initialNotes={initialNotes} categories={categories} />;
}
