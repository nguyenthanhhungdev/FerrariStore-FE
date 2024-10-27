import { Book } from "../../models/Book.ts";
import CategoryContainer from "./CategoryContainer.tsx";
import RatingsContainer from "./RatingsContainer.tsx";
import TitleContainer from "./TitleContainer.tsx";
import ButtonGroupContainer from "./ButtonGroupContainer.tsx";
import TabDefault from "./TabDefault.tsx";
import InformationContainer from "./InformationContainer.tsx";
import PartComponent from "./PartComponent.tsx";

interface BookDetailProps {
  book: Book;
  onAddToLibrary: () => void;
  onPreview: () => void;
  onPreoder: () => void;
  onSub: () => void;
  onCategoryClick: (categoryName: string) => void;
  onAuthorClick: (authorName: string) => void;
  isMobile: boolean;
}

const BookDetail = ({
  book,
  onAddToLibrary,
  onPreview,
  onPreoder,
  onSub,
  onCategoryClick,
  onAuthorClick,
  isMobile,
}: BookDetailProps) => {
  const authors = book.authors.map((author) => author.name);
  const tabData = [
    {
      label: "Part",
      value: "Part",
      content: (
        <div className="flex gap-6 items-start">
          {/* Author */}
          <InformationContainer
            header="Author"
            content={authors}
            onContainerClick={onAuthorClick}
          />
          <PartComponent />
        </div>
      ),
    },
    {
      label: "Comment",
      value: "comment",
      content: `Chúng tôi hiện đang tiếp tục xây dựng tính năng này. Các bạn có thể ủng hộ chúng tôi phát triển tính năng bằng cách đăng ký gói.`,
    },
  ];
  return (
    <>
      {/* Container */}
      <div
        className="
            container grid px-4
            md:grid-areas-product-detail-mobile md:grid-cols-[200px_auto]
            grid-areas-product-detail grid-cols-[1fr_200px_minmax(0,calc(1240px-3.5rem))_1fr]
            w-full h-full m-0 p-0
             "
      >
        {/* Background Container */}
        <div
          className="absolute top-0 left-0 z-[-2] w-full h-[250px] blur-sm bg-no-repeat  bg-gradient-to-t from-[
        before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-indigo-50
            before:to-gray-400
            before:opacity-75
            before:z-[-5]
        "
          style={{
            backgroundImage: `url(${book.cover_image})`,
            backgroundPosition: "top 35% center",
            backgroundSize: "100%",
          }}
        ></div>
        <div className="nav-l grid-in-cover mr-5 mb-5">
          <img
            src={book.cover_image}
            alt=""
            className="w-52 h-80 object-cover"
          />
        </div>
        {/*Tile*/}
        <div className="grid-in-title">
          <TitleContainer book={book} />
        </div>

        {/*ButtonGroup*/}
        <div className="grid-in-buttons sm:ml-2 relative mt-3">
          <ButtonGroupContainer
            onAddToLibrary={onAddToLibrary}
            onPreview={onPreview}
            onPreoder={onPreoder}
            onSub={onSub}
            isMobile={isMobile}
          />
        </div>

        {/* category */}
        <div className="grid-in-info sm:mx-2">
          <CategoryContainer book={book} onCategoryClick={onCategoryClick} />
        </div>

        {/* rating */}
        <div className="grid-in-stats sm:mx-2 mt-auto sm:mt-0">
          <RatingsContainer />
        </div>

        {/* description */}
        <div className="grid-in-synopsis overflow-hidden transition-[max-height,height]">
          <p className="story-description py-2 text-xl md:text-lg sm:text-sm">{book.description}</p>
        </div>

        {/* 
overflow-x-auto

Đảm bảo rằng nếu nội dung của phần tử vượt quá chiều rộng của nó,
một thanh cuộn ngang sẽ xuất hiện để người dùng có thể cuộn qua 
nội dung bị tràn

        */}

        <div className="content grid-in-content overflow-x-auto fill-width mt-2 mb-4">
          <TabDefault data={tabData} />
        </div>
      </div>
    </>
  );
};

export default BookDetail;

/* 

Thuộc tính này định nghĩa một lưới với 4 cột:

Cột đầu tiên chiếm một phần của không gian còn lại.
Cột thứ hai có chiều rộng cố định là 200 pixel.
Cột thứ ba có chiều rộng tối thiểu là 0 và tối đa là 1240px - 56px (3.5rem đổi ra pixel).
Cột thứ tư chiếm một phần của không gian còn lại.

*/
