import { HiArrowLeft } from "react-icons/hi";
import BookListContainer from "../components/BookList/BookListContainer";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import LayoutComponent from "../components/Share/LayoutComponent";

import { useCallback } from "react";
import useBooksRedux from "../hooks/useBooksRedux.ts";

interface Props {
  header: string;
  // data: Book[];
}

const BookListPage = ({ header }: Props) => {
  const navigate = useNavigate();

  // dùng useCallBack để tránh việc tạo ra các hàm mới mỗi khi render
  const handleBookClick = useCallback(
    (bookId: string) => {
      navigate(`/book/${bookId}`);
    },
    [navigate]
  );

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { books, errors, isLoading } = useBooksRedux();
  return (
    <LayoutComponent isMobile={false}>
      <div className="page-container p-6">
        <div className="flex items-center mb-6 mt-2">
          <IconButton
            onClick={handleBackClick}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <HiArrowLeft className="text-2xl" />
          </IconButton>
          <h1 className="text-2xl font-bold">{header}</h1>
        </div>
        <BookListContainer
          onClick={handleBookClick}
          books={books}
          errors={errors}
          isLoading={isLoading}
        />
      </div>
    </LayoutComponent>
  );
};

export default BookListPage;
