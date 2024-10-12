import { useEffect, useState } from "react";
// import './App.css';
import BookList from "./BookList";
import { Book } from "./models/Book";

const test_data: Book[] = [
  {
    id: "123456789",
    title: "Fuck Microsoft",
    description: "Microsoft is the bull shit company",
    cover_image:
      "https://img.perlego.com/book-covers/778577/9781451648553_300_450.webp",
    file_path: "dede",
    published_year: 2023,
    language: "vi",
    created_at: "2024-10-10T08:31:36.732Z",
    updated_at: "2024-10-10T08:31:36.732Z",
    authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
    coins: 50,
  },
];

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const response = await fetch("http://localhost:5024/api/Book");
        // const data = await response.json();
        // setBooks(data);
        setBooks(test_data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      id="root"
      className="m-0 flex place-items-center min-w-[320px] min-h-screen font-pop"
    >
      <BookList books={books} />
    </div>
  );
};

export default App;
