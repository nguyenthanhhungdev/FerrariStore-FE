import axios from "axios";
import { Book } from "../../models/Book";

const API_URL = "http://localhost:5024/api/Book";

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchBook = async (bookId: string): Promise<Book> => {
  const response = await axios.get(`${API_URL}/${bookId}`);
  return response.data;
};
