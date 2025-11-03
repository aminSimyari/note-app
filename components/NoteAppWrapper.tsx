// components/NoteAppWrapper.tsx
"use client";

import { useState } from "react";
import { Note, Category } from "@/types";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

// This is the component that handles all client-side state
interface NoteAppWrapperProps {
  initialNotes: Note[];
  categories: Category[];
}

export default function NoteAppWrapper({
  initialNotes,
  categories,
}: NoteAppWrapperProps) {
  const [notes, setNotes] = useState(initialNotes);

  const handleNoteCreated = (newNote: Note) => {
    // Add the new note to the top of the list
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleNotesUpdated = (updatedNotes: Note[]) => {
    // Update the list after a deletion event
    setNotes(updatedNotes);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <NoteForm categories={categories} onNoteCreated={handleNoteCreated} />
      <NotesList
        initialNotes={notes}
        categories={categories}
        onNoteDeleted={() => {}}
        onNotesUpdated={handleNotesUpdated}
      />
    </main>
  );
}
