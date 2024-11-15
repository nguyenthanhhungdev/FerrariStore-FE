import { Book } from "../models/Book.ts";
import BookDetail from "../components/BookDetail/BookDetail.tsx";
import { useParams } from "react-router-dom";
import LayoutComponent from "../components/Share/LayoutComponent.tsx";
import withFetchData from "../components/hoc/withFetchData.tsx";

/*
 *
 *
 * Ở đây phải đĩnh nghĩa props `data`
 * vì type checking của typescript sẽ báo lỗi nếu không có chúng.
 *
 * */

interface Props {
  isMobile: boolean;
  data: Book;
}

const BookDetailPage = ({ isMobile, data }: Props) => {
  return (
    <>
      <LayoutComponent isMobile={isMobile}>
        <div className="place-items-center">
          <BookDetail book={data} isMobile={isMobile} />
        </div>
      </LayoutComponent>
    </>
  );
};

/*
 *
 *
 * Các props `data`, `isLoading`, và `error` được loại bỏ trong `BookDetailPageWithParams` vì chúng được cung cấp bởi higher-order component (HOC) `withFetchData`.
 * HOC này sẽ fetch dữ liệu và truyền các props này vào component được bọc (`BookDetailPage`).
 * Do đó, chúng không cần thiết làm input props cho `BookDetailPageWithParams`.
 *
 * */
const BookDetailPageWithParams = ({ isMobile }: Omit<Props, "data">) => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const WrappedComponent = withFetchData<Props, Book>(
    BookDetailPage,
    `books/${id}`,
    ["book", id]
  );

  return <WrappedComponent isMobile={isMobile} />;
};

export default BookDetailPageWithParams;
