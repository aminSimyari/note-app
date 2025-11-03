"use client";

import React, { useState, useCallback } from "react";
import { Category, Note } from "../lib/types";

interface Props {
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}

export default function NoteForm({ categories, onNoteCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
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
        const newNote: Note = {
          id: Date.now().toString(),
          title: title.trim(),
          content: content.trim(),
          category: categoryId || categories[0]?.id,
          createdAt: new Date().toISOString(),
        };

        // IMPORTANT: call parent callback (synchronous and safe here)
        onNoteCreated(newNote);

        // Reset form
        setTitle("");
        setContent("");
        setCategoryId("");
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
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows={4}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- No category --</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Note"}
        </button>

        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </form>
    </aside>
  );
}
