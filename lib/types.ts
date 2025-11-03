export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}
