import { useQuery } from 'react-query';
import axios from 'axios';
import { Book } from '../models/Book';

const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(
      "http://localhost:5024/api/Book",
  );
  return response.data;
};

const useFetchBooks = () => {
  return useQuery<Book[], Error>('books', fetchBooks);
};

export default useFetchBooks;