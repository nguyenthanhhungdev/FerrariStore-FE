// src/ProductCard.jsx
import { Book } from "./models/Book";
const ProductCard = ({ book }: { book: Book }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 text-center m-4 ">
            <h2 className="text-xl font-bold m-2">{book.title}</h2>
            <p className="text-gray-700">{book.description}</p>
            <p className="text-gray-700">{book.coins}</p>
            <img
                className="w-full h-auto rounded-lg"
                src={book.cover_image}
                alt={book.title}
            />
            <p className="text-gray-500">
                Published Year: {book.published_year}
            </p>
            <p className="text-gray-500">Language: {book.language}</p>
            <p className="text-gray-500">Authors: {book.authors.join(", ")}</p>
        </div>
    );
};

export default ProductCard;
