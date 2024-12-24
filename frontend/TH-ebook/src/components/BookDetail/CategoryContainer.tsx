import { Book } from "../../models/Book.ts";
import { Chip } from "@material-tailwind/react";
import React from "react";

interface CategoryProps {
  book: Book;
  onCategoryClick: (categoryName: string) => void;
}

const CategoryContainer = ({ book, onCategoryClick }: CategoryProps) => {
  return (
    <div className="flex gap-1 flex-wrap items-center">
      <div className="category flex gap-1 flex-wrap items-center">
        {book.category.map((category) => (
          <Chip
            key={category.name}
            variant="outlined"
            value={category.name}
            color="amber"
            onClick={() => onCategoryClick(category.name)}
          />
        ))}
      </div>
      <span className="uppercase flex flex-nowrap items-center">
        <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" style={{color: "rgb(4, 208, 0)"}}>
          <circle
            r="6"
            cx="12"
            cy="12"
            fill="currentColor"
          />
        </svg>
        <p className="font-bold">Publication: {book.published_year}, Ongoing</p>
      </span>
    </div>
  );
};

export default CategoryContainer;
