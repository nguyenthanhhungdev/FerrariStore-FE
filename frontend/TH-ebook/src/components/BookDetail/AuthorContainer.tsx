import { Book } from "../../models/Book.ts";
import { Chip } from "@material-tailwind/react";

interface AuthorProps {
  book: Book;
  onAuthorClick: (categoryName: string) => void;
}

const AuthorContainer = ({ book, onAuthorClick }: AuthorProps) => {
  return (
    <div className="category flex flex-wrap gap-x-4 gap-y-2 ">
      <h3 className="text-lg font-bold text-black mb-2">Author: </h3>
      {book.authors.map((author) => (
        <div>
          <Chip
            className="inline-flex"
            key={author.name}
            variant="gradient"
            value={author.name}
            color="gray"
            onClick={() => onAuthorClick(author.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default AuthorContainer;
