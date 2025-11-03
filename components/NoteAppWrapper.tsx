"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Note, Category } from "../lib/types";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

interface NoteAppWrapperProps {
  categories: Category[];
}

export default function NoteAppWrapper({ categories }: NoteAppWrapperProps) {
  // IMPORTANT: start with empty array so server-render and initial client render match
  const [notes, setNotes] = useState<Note[]>([]);

  // Load saved notes from localStorage after mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes");
      if (!raw) return;
      const parsed: Note[] = JSON.parse(raw);
      // Only update state if parsed is different / non-empty to avoid unnecessary re-renders
      if (Array.isArray(parsed) && parsed.length > 0) {
        setNotes(parsed);
      }
    } catch {
      // ignore parse/storage errors
    }
  }, []);

  // Persist notes to localStorage whenever notes change
  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch {
      // ignore storage errors
    }
  }, [notes]);

  const addNote = useCallback((n: Note) => {
    setNotes((prev) => [n, ...prev]);
  }, []);

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((p) => p.id !== id));
  }, []);

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
}
