"use client";

import React, { useState } from "react";
import { Note, Category } from "../lib/types";

interface Props {
  notes: Note[];
  categories: Category[];
  onNoteDeleted: (id: string) => void;
}

const NotesList: React.FC<Props> = ({ notes, categories, onNoteDeleted }) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const getCategoryName = (id?: string) =>
    categories.find((c) => c.id === id)?.name || "Uncategorized";

  const handleDelete = (id: string) => {
    setLoadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      // simulate API delay
      onNoteDeleted(id);
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }, 200);
  };

  if (!notes) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes yet.</p>;

  return (
    <div className="md:w-2/3 p-4">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-white rounded shadow-md border">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-500">
              Category: {getCategoryName(note.category)}
            </p>
            <p className="mt-2">{note.content}</p>
            <button
              className="text-red-600 mt-2"
              onClick={() => handleDelete(note.id)}
              disabled={loadingIds.includes(note.id)}
            >
              {loadingIds.includes(note.id) ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
