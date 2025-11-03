// app/page.tsx
// This is now a pure Server Component, fixing the 'useState' error.

import NoteAppWrapper from "@/components/NoteAppWrapper"; // Import the new client wrapper
import { Note, Category } from "@/types";

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

// --- 3. Main Page Component (Server Component, default export) ---

export default async function HomePage() {
  const { notes: initialNotes, categories, error } = await fetchAppData();

  if (error) {
    // Error state rendered by Server Component
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

  // Success: Pass data to the Client Wrapper
  return <NoteAppWrapper initialNotes={initialNotes} categories={categories} />;
}
