// components/NotesList.tsx

"use client";

import { Note, Category } from "@/types";
import { useState } from "react";

interface NotesListProps {
  initialNotes: Note[];
  categories: Category[];
  onNoteDeleted: (id: string) => void;
  onNotesUpdated: (notes: Note[]) => void;
}

const getCategoryName = (
  categoryId: string | undefined,
  categories: Category[]
) => {
  if (!categoryId) return null;
  return categories.find((c) => c.id === categoryId)?.name;
};

export default function NotesList({
  initialNotes,
  categories,
  onNoteDeleted,
  onNotesUpdated,
}: NotesListProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        onNotesUpdated(updatedNotes);
        onNoteDeleted(id);
      } else {
        alert("Error deleting note. Note might not be found.");
      }
    } catch (error) {
      alert("Network error during deletion.");
    } finally {
      setDeletingId(null);
    }
  };

  // Case 1: Empty State (This section is the one that was causing the most confusion)
  if (notes.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">You do not have any notes yet.</p>
      </div>
    );
  }

  // Case 2: Success State (List of notes)
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Note List</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-100 flex justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 space-x-reverse mb-1">
                <p className="text-lg font-bold text-gray-900">{note.title}</p>
                {note.categoryId && (
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                    {getCategoryName(note.categoryId, categories)}
                  </span>
                )}
              </div>
              {/* Simplification: Displaying content directly without substring/line-clamp */}
              <p className="text-sm text-gray-600">
                {note.content || "No content provided."}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Date: {new Date(note.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>

            <button
              onClick={() => handleDelete(note.id)}
              className={`text-sm py-1 px-3 rounded-md transition-colors ml-4 ${
                deletingId === note.id
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
