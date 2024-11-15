import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../models/Book.ts";

import AuthorTagComponent from "./AuthorTagComponent.tsx";
import ButtonGroupContainer from "./ButtonGroupContainer.tsx";
import CategoryContainer from "./CategoryContainer.tsx";
import PartComponent from "./PartComponent.tsx";
import RatingsContainer from "./RatingsContainer.tsx";
import TabDefault from "./TabDefault.tsx";

import {
  TitleContainerFittyF,
  TitleContainerFittyR,
} from "./TitleContainer.tsx";
interface BookDetailProps {
  book: Book;
  isMobile: boolean;
}

const BookDetail = ({ book, isMobile }: BookDetailProps) => {
  const navigate = useNavigate();
  const handleAddToLibrary = () => {
    console.log("Add to library clicked");
  };

  const handlePreview = () => {
    console.log("Preview clicked");
  };

  const handlePreorder = () => {
    console.log("Preorder clicked");
  };

  const handleSub = () => {
    console.log("Subscribe clicked");
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category clicked: ${categoryName}`);
  };

  const handleAuthorClick = (authorName: string) => {
    console.log(`Author clicked: ${authorName}`);
  };
  const handleReadClick = () => navigate(`/book/${book.id}/${1}/${1}`);
  const authors = book.authors.map((author) => author.name);
  const tabData = [
    {
      label: "Part",
      value: "Part",
      content: (
        <div className="flex gap-6 items-start">
          {/* Author */}
          <AuthorTagComponent
            header="Author"
            content={authors}
            onContainerClick={handleAuthorClick}
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
  const [rangeMode, setRangeMode] = useState<boolean>(true);
  return (
    <>
      {/* Container */}
      <div
        className="
            grid gap-4 px-4
            grid-areas-product-detail-mobile grid-cols-[200px_auto]
            md:grid-areas-product-detail md:grid-cols-[1fr_200px_minmax(0,calc(1240px-3.5rem))_1fr]
            w-full h-full m-0 p-0"
      >
        {/* Background Container */}
        {/* <div
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
        ></div> */}
        <div className="nav-l grid-in-cover">
          <img src={book.cover_image} alt="" className="w-full" />
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >{`Fit Text mode: ${rangeMode ? "Range" : "Fixed"}`}</Typography>
        </div>
        {/*Tile*/}
        <div className="grid-in-title">
          {rangeMode ? (
            <TitleContainerFittyR book={book} />
          ) : (
            <TitleContainerFittyF book={book} />
          )}
        </div>

        {/*ButtonGroup*/}
        <div className="grid-in-buttons sm:ml-2 relative mt-3">
          <ButtonGroupContainer
            onAddToLibrary={handleAddToLibrary}
            onPreview={handlePreview}
            onPreoder={handlePreorder}
            onSub={handleSub}
            onRead={handleReadClick}
            onFlag={() => setRangeMode(!rangeMode)}
            isMobile={isMobile}
          />
        </div>

        {/* category */}
        <div className="grid-in-info">
          <CategoryContainer
            book={book}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* rating */}
        <div className="grid-in-stats">
          <RatingsContainer />
        </div>

        {/* description */}
        <div className="grid-in-synopsis overflow-hidden transition-[max-height,height]">
          <p className="story-description py-2 text-xl md:text-lg sm:text-sm">
            {book.description}
          </p>
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
