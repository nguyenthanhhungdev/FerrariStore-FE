// src/ProductList.jsx
import { Book } from "./models/Book";
import ProductCard from "./BookCard";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="product-list">
      {books.map((book) => (
        <ProductCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
