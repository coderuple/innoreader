import React, { ChangeEvent } from "react";
import { debounce } from "../utils";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setQuery(e.target.value);
    }, 500)();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for articles..."
        defaultValue={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
