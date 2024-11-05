import {Book} from "../models/Book.ts";
import BookDetail from "../components/BookDetail/BookDetail.tsx";
// import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";

interface Props {
    books: Book[];
    isMobile: boolean;
}

const BookDetailPage = ({isMobile}: Props) => {
    // const { id } = useParams<{ id: string }>();
    // const book = books.find((book) => book.id === id);


    const location = useLocation();
    const {book} = location.state as { book: Book };


    if (!book) {
        return <div>No book found</div>;
    }
    return (
        <div className="place-items-center">
            <BookDetail
                book={book}
                isMobile={isMobile}
            />
        </div>
    );
};

export default BookDetailPage;
