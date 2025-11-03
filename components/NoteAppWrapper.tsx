"use client";

import React, { useState, useEffect } from "react";
import { Note, Category } from "@/lib/types";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

interface NoteAppWrapperProps {
  initialNotes: Note[];
  categories: Category[];
}

const NoteAppWrapper: React.FC<NoteAppWrapperProps> = ({ categories }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, []);

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote: Note) => setNotes((prev) => [newNote, ...prev]);
  const removeNote = (id: string) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50 p-4">
      <NoteForm categories={categories} onNoteCreated={addNote} />
      <NotesList
        notes={notes}
        categories={categories}
        onNoteDeleted={removeNote}
      />
    </main>
  );
};

export default NoteAppWrapper;
