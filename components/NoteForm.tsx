"use client";

import React, { useState } from "react";
import { Category, Note } from "../lib/types";

interface Props {
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}

const NoteForm: React.FC<Props> = ({ categories, onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        category: categoryId || categories[0].id,
        createdAt: new Date().toISOString(),
      };

      onNoteCreated(newNote);

      // Reset form
      setTitle("");
      setContent("");
      setCategoryId("");
    } catch (err) {
      setError("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-1/3 p-4 bg-white rounded shadow-md mb-4 md:mb-0 md:mr-4">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Content */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Category Select */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">--No Category--</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Note"}
        </button>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>
    </div>
  );
};

export default NoteForm;
