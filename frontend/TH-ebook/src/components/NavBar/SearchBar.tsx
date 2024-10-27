import { Button, Input } from "@material-tailwind/react";

const SearchBar = () => {
  return (
    <div className="search-bar flex items-center">
      <div className="relative flex w-full gap-2 md:w-max items-center">
        <Input
          type="search"
          color="black"
          label="Type here..."
          className="pr-20 bg-white text-black"
          containerProps={{ className: "min-w-[288px]" }}
        />
        <Button
          size="sm"
          color="black"
          className="!absolute right-1 top-1 rounded"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
