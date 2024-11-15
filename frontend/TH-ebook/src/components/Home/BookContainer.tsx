import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { Book } from "../../models/Book.ts";
import {
  HiOutlineArrowSmRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import CardDefault from "../Card/CardDefault.tsx";
import { Button, IconButton } from "@material-tailwind/react";
import LoadingSpinner from "../_Common/LoadingSpinner.tsx";

interface Props {
  books: Book[];
  isLoading: boolean;
  errors: string;
  header: string;
  onClick: (book: Book) => void;
  onListClick: (books: Book[]) => void;
}

const BookContainer = ({
  books,
  header,
  onClick,
  onListClick,
  isLoading,
  errors,
}: Props) => {
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (errors) {
    return <div className="text-2xl text-red-900">Error loading data</div>;
  }
  return (
    <>
      <div className="w-full">
        <div className="md:overflow-hidden mx-20">
          <div className="flex justify-between items-center text-2xl mb-4">
            <h1 className="text-white text-4xl lg:text-2xl md:text-xl sm:text-base font-bold">
              {header}
            </h1>
            <IconButton
              color="deep-orange"
              size="lg"
              onClick={() => onListClick(books)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <HiOutlineChevronDoubleRight className="text-white" />
            </IconButton>
          </div>
          <Swiper
            modules={[Scrollbar, Mousewheel]}
            loop={true}
            pagination={{ clickable: true }}
            // centeredSlides={true}
            grabCursor={true}
            scrollbar={{ draggable: true }}
            mousewheel={{ invert: false }}
            updateOnWindowResize={false}
            resizeObserver={true}
            autoHeight={true}
            slidesPerView={"auto"}
          >
            {books.map((p, index) => {
              return (
                // trick lo force width vi .swiper-slide width 100%
                <SwiperSlide key={index} className="!w-auto">
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
                        <Button
                          color="deep-orange"
                          size="lg"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Read
                        </Button>
                        <IconButton
                          color="gray"
                          size="lg"
                          onClick={() => onClick(p)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
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
