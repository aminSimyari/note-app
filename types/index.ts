export type Category = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  title: string;
  content?: string;
  categoryId?: string;
  createdAt: string; // ISO format (e.g., "2025-11-03T12:00:00.000Z")
};
