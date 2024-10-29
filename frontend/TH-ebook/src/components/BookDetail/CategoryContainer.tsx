import {Book} from "../../models/Book.ts";
import {Chip} from "@material-tailwind/react";
import React from "react";

interface CategoryProps {
    book: Book;
    onCategoryClick: (categoryName: string) => void;
}

const CategoryContainer = ({book, onCategoryClick}: CategoryProps) => {
    return (
        <div className="category flex gap-1 flex-wrap items-center">
            {book.category.map((category) => (
                <Chip
                    key={category.name}
                    variant="gradient"
                    value={category.name}
                    color="gray"
                    onClick={() => onCategoryClick(category.name)}
                />

            ))}
        </div>
    );
}

export default CategoryContainer;