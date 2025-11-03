import NoteAppWrapper from "@/components/NoteAppWrapper";
import { getNotes, getCategories } from "@/lib/data-store";

export default async function HomePage() {
  const initialNotes = getNotes();
  const categories = getCategories();

  return <NoteAppWrapper initialNotes={initialNotes} categories={categories} />;
}
