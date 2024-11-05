import { Book } from "../../models/Book.ts";
import { Chip } from "@material-tailwind/react";
import CardDefault from "../Card/CardDefault.tsx"; // Import CardDefault

interface AuthorProps {
  book: Book;
  onAuthorClick: (authorName: string) => void;
}

const AuthorCard = ({ book, onAuthorClick }: AuthorProps) => {
  // Tạo các Chip cho các tác giả
  const authorChips = book.authors.map((author) => (
    <Chip
      key={author.name}
      variant="gradient"
      value={author.name}
      color="gray"
      onClick={() => onAuthorClick(author.name)}
      size="sm"
    />
  ));

  return (
    <CardDefault
      ComponentHeader={<h3 className="text-lg font-bold text-black mb-2">Author</h3>}
      ComponentBody={<div className="category flex flex-wrap gap-1">{authorChips}</div>}
    />
  );
};

export default AuthorCard;