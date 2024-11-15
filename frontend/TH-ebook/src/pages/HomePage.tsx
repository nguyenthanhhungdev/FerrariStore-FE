import { useNavigate } from "react-router-dom";
import LayoutComponent from "../components/Share/LayoutComponent";
import BannerSlider from "../components/Home/BannerSlider";
import BookContainer from "../components/Home/BookContainer";
import { Book } from "../models/Book";
import useBooksRedux from "../hooks/useBooksRedux.ts";

interface Props {
  isMobile: boolean;
}

const HomePage = ({ isMobile }: Props) => {
  const navigate = useNavigate();

  const handleBannerClick = (book: Book) => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  const handleBookListClick = (books: Book[]) => {
    navigate(`/book`, { state: { books } });
  };

  const { books, errors, isLoading } = useBooksRedux();

  return (
    <div className="home-page gap-y-10">
      <LayoutComponent isMobile={isMobile}>
        <BannerSlider
          books={books}
          isMobile={isMobile}
          onClick={handleBannerClick}
        />
        <BookContainer
          header="Trending"
          books={books}
          onClick={handleBookClick}
          onListClick={handleBookListClick}
          errors={errors}
          isLoading={isLoading}
        />
        <div className="flex-grow hidden sm:block" />
        <BookContainer
          header="New"
          books={books}
          onClick={handleBookClick}
          onListClick={handleBookListClick}
          errors={errors}
          isLoading={isLoading}
        />
        <div className="flex-grow hidden sm:block" />
        <BookContainer
          header="Features"
          books={books}
          onClick={handleBookClick}
          onListClick={handleBookListClick}
          errors={errors}
          isLoading={isLoading}
        />
      </LayoutComponent>
    </div>
  );
};

export default HomePage;

/* 



m-0: Thiết lập margin (khoảng cách ngoài) của phần tử là 0.
flex: Thiết lập phần tử thành một container flexbox, cho phép bạn sử dụng các thuộc tính flexbox để sắp xếp các phần tử con.
place-items-center: Căn giữa các phần tử con theo cả trục ngang và trục dọc trong container flexbox.
min-w-[320px]: Thiết lập chiều rộng tối thiểu của phần tử là 320 pixel.
min-h-screen: Thiết lập chiều cao tối thiểu của phần tử bằng chiều cao của màn hình.
font-pop: Áp dụng font chữ "Pop" cho phần tử. Đây có thể là một lớp tùy chỉnh trong cấu hình Tailwind CSS của bạn.
w-full: Thiết lập chiều rộng của phần tử là 100% chiều rộng của phần tử cha.
h-full: Thiết lập chiều cao của phần tử là 100% chiều cao của phần tử cha.
bg-black: Thiết lập màu nền của phần tử là màu đen.




*/

/* 



"container flexbox" là một cách để sử dụng CSS Flexbox trong một container để sắp xếp các phần tử con bên trong nó. Flexbox là một mô hình bố cục một chiều giúp dễ dàng thiết kế các bố cục phức tạp và đáp ứng.




*/
