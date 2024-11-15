import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";
import Banner from "./Banner";
import { Book } from "../../models/Book";
// import { useNavigate } from "react-router-dom";
// import book from "../../Book.tsx";

interface Props {
  books: Book[];
  isMobile: boolean;
  onClick: (book: Book) => void;
}

const BannerSlider = ({ books, isMobile, onClick }: Props) => {
  // const navigate = useNavigate();
  //
  // const handleBookClick = (bookId: string) => {
  //   navigate(`/book/${bookId}`);
  // };
  return (
    <>
      <Swiper
        modules={[Scrollbar, Mousewheel]}
        loop={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        mousewheel={{ invert: false }}
        updateOnWindowResize={false}
        resizeObserver={true}
        autoHeight={true}
        slidesPerView={1}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} onClick={() => onClick(book)}>
            <Banner book={book} isMobile={isMobile} />
          </SwiperSlide>
        ))}
        {/* Add more slides as needed */}
      </Swiper>
    </>
  );
};

export default BannerSlider;
