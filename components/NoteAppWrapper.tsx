"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";
import { Note, Category } from "../lib/types";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

interface NoteAppWrapperProps {
  categories: Category[];
}

export default function NoteAppWrapper({ categories }: NoteAppWrapperProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load saved notes after mount; mark update as non-urgent with startTransition
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notes");
      if (!raw) return;
      const parsed: Note[] = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return;

      // Use startTransition to avoid synchronous cascading renders
      startTransition(() => {
        setNotes(parsed);
      });
    } catch {
      // ignore parse/storage errors
    }
  }, []);

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
