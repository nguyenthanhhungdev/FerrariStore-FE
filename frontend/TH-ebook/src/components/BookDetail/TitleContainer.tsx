import { Book } from "../../models/Book.ts";

interface Props {
  book: Book;
}

const TitleContainer = ({ book }: Props) => {
  return (
    <>
      <div className="title ">
        <span
          className="mb-1 block text-5xl font-bold sm:text-3xl md:text-4xl"
          style={{
            textShadow: "rgba(0, 0, 0, 0.3) 1px 2px 4px"
          }}
        >
          {book.title}
        </span>
        <span className="text-3xl font-normal line-clamp-2 sm:text-xl md:text-2xl inline-block leading-5">Cross Method in the Dead of Night</span>
        <div className="flex-grow hidden sm:block"></div>

        <span className="block font-normal text-2xl md:text-xl sm:text-base sm:truncate flex-shrink-0">
          {book.authors.map((author) => author.name).join(", ")}
        </span>
        <span className=" text-xl md:text-base sm:text-sm font-bold">
          Publication: {book.published_year}
        </span>
      </div>
    </>
  );
};

export default TitleContainer;
