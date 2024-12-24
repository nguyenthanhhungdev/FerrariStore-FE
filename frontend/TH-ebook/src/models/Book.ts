import { Author } from "./Author";
import { Category } from "./Category.ts";

export interface Book {
  id: string;
  title: string;
  altTitle: string;
  description: string;
  cover_image: string;
  file_path: string;
  published_year: number;
  language: string;
  created_at: string;
  updated_at: string;
  authors: Author[];
  coins: number;
  category: Category[];
}
