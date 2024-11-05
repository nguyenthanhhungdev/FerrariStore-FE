import { Book } from "../../models/Book.ts";
import CategoryContainer from "../BookDetail/CategoryContainer.tsx";
import TitleContainer from "../BookDetail/TitleContainer.tsx";

interface Props {
  book: Book;
  isMobile: boolean;
}

const Banner = ({
  book, isMobile
}: Props) => {
  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category clicked: ${categoryName}`);
  };
  return (
    <>
      {/* Container */}
      <div
        className="
            container grid px-4
            md:grid-areas-product-detail-mobile md:grid-cols-[200px_auto]
            grid-areas-product-detail grid-cols-[1fr_200px_minmax(0,calc(1240px-3.5rem))_1fr]
            w-full h-full m-0 p-0
            cursor-pointer
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
            alt={book.title}
            className="w-52 h-80 object-cover"
          />
        </div>
        {/*Tile*/}
        <div className="grid-in-title">
          <TitleContainer book={book} />
        </div>

        {/* category */}
        <div className="grid-in-info sm:mx-2">
          <CategoryContainer book={book} onCategoryClick={handleCategoryClick} />
        </div>

        {/* description */}
        {!isMobile && <div className="grid-in-stats overflow-hidden transition-[max-height,height]">
          <p className="story-description py-2 text-xl md:text-lg sm:text-sm">{book.description}</p>
        </div>}

      </div>
    </>
  );
};

export default Banner;
