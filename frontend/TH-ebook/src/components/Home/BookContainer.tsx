import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Scrollbar } from "swiper/modules";
import { Book } from "../../models/Book.ts";
import { HiOutlineArrowSmRight, HiOutlineChevronDoubleRight} from "react-icons/hi";
import CardDefault from "../Card/CardDefault.tsx";
import { Button, IconButton } from "@material-tailwind/react";
import {useNavigate} from "react-router-dom"

interface Props {
  books: Book[];
  header: string;
  onClick: (book: Book) => void;
  onListClick: (books: Book[]) => void;
}

const BookContainer = ({ books, header, onClick, onListClick }: Props) => {
  const navigate = useNavigate();

  // const handleBookClick = (bookId: string) => {
  //   navigate(`/book/${bookId}`);
  // };

  // const handleListClick = () => {
  //   navigate("/book/trending");
  // }
  return (
    <>
      <div className="w-full">
        <div className="md:overflow-hidden mx-20">
            <div className="flex justify-between items-center text-2xl mb-4">
                <h1 className="text-white text-4xl lg:text-2xl md:text-xl sm:text-base font-bold">{header}</h1>
                <IconButton color="deep-orange" size="lg" onClick={()=> onListClick(books)}>
                    <HiOutlineChevronDoubleRight className="text-white" />
                </IconButton>
            </div>
          <Swiper
            modules={[Scrollbar, Mousewheel, Autoplay]}
            loop={true}
            pagination={{ clickable: true }}
            centeredSlides={true}
            grabCursor={true}
            scrollbar={{ draggable: true }}
            mousewheel={{
              invert: false,
            }}
            // autoplay={{
            //     delay: 5000,
            //     stopOnLastSlide: false,
            //     disableOnInteraction: false,
            // }}

            // Responsive breakpoints
            breakpoints={{
                0: {
                    spaceBetween: 3,
                    slidesPerView: 1,
                },
                468: {
                    spaceBetween: 5,
                    slidesPerView: 1,
                },
                768: {
                    spaceBetween: 15,
                    slidesPerView: 2,
                },
                1024: {
                    spaceBetween: 15,
                    slidesPerView: 3,
                },
                1280: {
                    spaceBetween: 30,
                    slidesPerView: 4,
                },
            }}
            className="breakpoint"
          >
            {books.map((p, index) => {
              return (
                <SwiperSlide key={index} >
                  {/* <BookCard book={p} /> */}
                  <CardDefault
                    imageUrl={p.cover_image}
                    key={p.id}
                    ComponentHeader={
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    }
                    ComponentBody={[
                      <h3 className="text-xl font-bold text-white mb-2">
                        {p.title}
                      </h3>,
                      <div key="authors" className="text-sm">
                        {p.authors.map((author) => author.name).join(", ")}
                      </div>,
                      <div key="published_year" className="text-sm">
                        {p.published_year}
                      </div>,
                    ]}
                    ComponentFooter={[
                      <div className="flex justify-between items-center text-2xl mb-4">
                        <Button color="deep-orange" size="lg" >
                            Read
                        </Button>
                        <IconButton color="gray" size="lg" onClick={() => onClick(p)}>
                          <HiOutlineArrowSmRight className="text-white" />
                        </IconButton>
                      </div>,
                    ]}
                  ></CardDefault>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BookContainer;
/**
 *
 *
 * Các con số như `0`, `468`, `768`, `1024`, `1280` trong đoạn mã của bạn đại diện cho các điểm ngắt (breakpoints) trong thiết kế responsive. Chúng xác định các kích thước chiều rộng màn hình (theo đơn vị pixel) mà tại đó các thuộc tính của `Swiper` sẽ thay đổi để phù hợp với kích thước màn hình khác nhau.
 *
 * Cụ thể:
 * - `0`: Áp dụng cho màn hình có chiều rộng từ 0 pixel trở lên.
 * - `468`: Áp dụng cho màn hình có chiều rộng từ 468 pixel trở lên.
 * - `768`: Áp dụng cho màn hình có chiều rộng từ 768 pixel trở lên.
 * - `1024`: Áp dụng cho màn hình có chiều rộng từ 1024 pixel trở lên.
 * - `1280`: Áp dụng cho màn hình có chiều rộng từ 1280 pixel trở lên.
 *
 * Mỗi điểm ngắt này có các thuộc tính `spaceBetween` và `slidesPerView` để điều chỉnh khoảng cách giữa các slide và số lượng slide hiển thị tương ứng với kích thước màn hình.
 *
 *
 * */
