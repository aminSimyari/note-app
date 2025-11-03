"use client";

import NoteAppWrapper from "@/components/NoteAppWrapper";
import { getCategories } from "@/lib/data-store";
import { Category } from "@/lib/types";

export default function HomePage() {
  const categories: Category[] = getCategories();
  return <NoteAppWrapper categories={categories} />;
}
