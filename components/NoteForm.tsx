"use client";

import React, { useState, useCallback } from "react";
import { Category, Note } from "../lib/types";

interface Props {
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}

export default function NoteForm({ categories, onNoteCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Initialize categoryId with the first category's ID or an empty string
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!title.trim()) {
        setError("Title is required");
        return;
      }

      setLoading(true);
      try {
        // 🚀 **NEW: Send POST request to the server API**
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
            category: categoryId || categories[0]?.id,
          }),
        }); // Check for network/server errors (4xx or 5xx)

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Server Error: ${response.status}`
          );
        } // Get the response data (which contains the note created by the backend)

        const result = await response.json();
        const newNoteFromServer: Note = result.data; // Call the parent callback to update the list with the server's data

        onNoteCreated(newNoteFromServer); // Reset form state

        setTitle("");
        setContent("");
        setCategoryId(categories[0]?.id || "");
      } catch (err: unknown) {
        // safe handling of unknown error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err) || "Failed to create note");
        }
      } finally {
        setLoading(false);
      }
    },
    [title, content, categoryId, categories, onNoteCreated]
  );

  return (
    <aside className="md:w-1/3 p-4 bg-white rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>     {" "}
      <form onSubmit={submit} className="space-y-3">
               {" "}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
               {" "}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows={4}
        />
               {" "}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
        >
                    <option value="">-- No category --</option>         {" "}
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
                            {c.name}           {" "}
            </option>
          ))}
                 {" "}
        </select>
               {" "}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-60"
        >
                    {loading ? "Saving..." : "Save Note"}       {" "}
        </button>
                {error && <p className="text-sm text-red-600 mt-1">{error}</p>} 
           {" "}
      </form>
         {" "}
    </aside>
  );
}
