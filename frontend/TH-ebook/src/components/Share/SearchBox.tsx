// src/components/SearchBox.tsx
import React from 'react';

const SearchBox: React.FC = () => {
  return (
    <div id="SearchBox" className="relative flex items-center">
      <input
        type="text"
        className="bg-white/20 text-white rounded-md p-1.5 w-80 h-8 outline-none border-none pr-10 font-bold"
        placeholder="Search..."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute right-2 w-5 h-5 text-white hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default SearchBox;