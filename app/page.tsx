// app/page.tsx

// ... import statements and NoteAppClient definition ...

// --- 1. Server-side Data Fetching ---

// Define the base URL dynamically
const API_BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}` // Use Vercel URL in Production
  : "http://localhost:3000"; // Use localhost in Development

async function fetchAppData() {
  try {
    const [notesRes, categoriesRes] = await Promise.all([
      // Use the dynamic API_BASE_URL
      fetch(`${API_BASE_URL}/api/notes`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/api/categories`, { cache: "force-cache" }),
    ]);

    if (!notesRes.ok) throw new Error("Failed to fetch notes.");
    if (!categoriesRes.ok) throw new Error("Failed to fetch categories.");

    // ... rest of the function remains the same ...
    const notesData = await notesRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      notes: notesData.data as Note[],
      categories: categoriesData.data as Category[],
      error: null,
    };
  } catch (error: any) {
    // Handling error state for API failure
    return {
      notes: [],
      categories: [],
      error: (error as Error).message || "Unknown API connection error.",
    };
  }
}

// ... rest of the file ...
