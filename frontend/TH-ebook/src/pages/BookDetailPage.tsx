import { Book } from "../models/Book.ts";
import { Category } from "../models/Category.ts";
import BookDetail from "../components/BookDetail/BookDetail.tsx";

const categories: Category[] = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Fantasy" },
  { name: "Horror" },
  { name: "Mystery" },
  { name: "Romance" },
  { name: "Sci-Fi" },
  { name: "Thriller" },
  { name: "Western" },
  { name: "Biography" },
  { name: "Cookbook" },
];

const test_data: Book = {
  id: "123456789",
  title: "Fuck Microsoft",
  description:
    'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
  cover_image:
    "https://img.perlego.com/book-covers/778577/9781451648553_300_450.webp",
  file_path: "dede",
  published_year: 2023,
  language: "vi",
  created_at: "2024-10-10T08:31:36.732Z",
  updated_at: "2024-10-10T08:31:36.732Z",
  authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
  coins: 50,
  category: categories,
};
const handleCategoryClick = (categoryName: string) => {
  console.log(`Category clicked: ${categoryName}`);
};
const handleAuthorClick = (authorName: string) => {
  console.log(`Author clicked: ${authorName}`);
};

interface Props{
  isMobile: boolean;
}

const BookDetailPage = ({isMobile}:Props) => {
  return (
    <div className=" md-content flex-grow place-items-center">
      <BookDetail
        book={test_data}
        onAddToLibrary={() => {}}
        onPreoder={() => {}}
        onPreview={() => {}}
        onSub={() => {}}
        onCategoryClick={handleCategoryClick}
        onAuthorClick={handleAuthorClick}
        isMobile={isMobile}
      />
    </div>
  );
};

export default BookDetailPage;
