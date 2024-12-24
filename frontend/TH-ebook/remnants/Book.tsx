import useFetchBooks from './hooks/useFetchBook.ts';
import BreakPoint from "./components/Home/BookContainer.tsx";

const HungApp = () => {
  const { data: books, error, isLoading } = useFetchBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!books) {
    return <div>No books available</div>;
  }

  return (
    <div
      id="root"
      className="m-0 flex place-items-center min-w-[320px] min-h-screen font-pop w-full h-full bg-black"
    >
      <BreakPoint books={books} header={"My App"} />
    </div>
  );
};

export default HungApp;