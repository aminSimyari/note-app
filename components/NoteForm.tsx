// components/NoteForm.tsx

"use client";

import { useState } from "react";
import { Category, Note } from "@/types";

interface NoteFormProps {
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}

export default function NoteForm({ categories, onNoteCreated }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setIsLoading(true);

    const payload = {
      title,
      content: content.trim() || undefined,
      categoryId: categoryId || undefined,
    };

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create note.");
      }

      const { data: newNote } = await response.json();

      // CRITICAL FIX FOR RELOAD: Call the passed function with the new note immediately
      onNoteCreated(newNote);

      // Reset form fields
      setTitle("");
      setContent("");
      setCategoryId("");
    } catch (err: unknown) {
      let errorMessage = "An issue occurred while connecting to the server.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "error" in err) {
        errorMessage = (err as { error: string }).error;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border-b md:border-r md:border-b-0 border-gray-200 md:w-1/3 lg:w-1/4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title (Required)
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content (Optional)
          </label>
          <textarea
            id="content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            disabled={isLoading}
          >
            <option value="">-- No Category --</option>
            {/* Categories are correctly fetched and displayed here */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Save Note"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
