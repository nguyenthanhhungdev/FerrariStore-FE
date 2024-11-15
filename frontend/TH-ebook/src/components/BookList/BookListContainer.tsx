import { Book } from "../../models/Book";
import LoadingSpinner from "../_Common/LoadingSpinner.tsx";
import BookListComponent from "./BookListComponent.tsx";

interface Props {
  books: Book[];
  onClick: (bookId: string) => void;
  isLoading: boolean;
  errors: string;
}

const BookListContainer = ({ books, onClick, isLoading, errors }: Props) => {
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  if (errors) {
    return <div className="text-2xl text-red-900">Error loading data</div>;
  }

  return books.map((book) => <BookListComponent book={book} />);
};

export default BookListContainer;
