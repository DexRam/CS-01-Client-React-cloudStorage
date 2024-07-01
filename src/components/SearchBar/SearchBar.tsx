import { useState, ChangeEvent, FC } from "react";

const SearchBar: FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSearch = (): void => {
    console.log("Search query:", query);
  };

  const inputClassNames = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300";
  const buttonClassNames = "bg-blue-500 text-white ml-2 py-2 px-4 rounded hover:bg-blue-600 transition duration-300";

  return (
    <div className="flex text-center mt-4 min-w-96">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className={inputClassNames}
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className={buttonClassNames}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
