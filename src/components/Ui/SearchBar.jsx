import { FaSearch } from "react-icons/fa";

export const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
    <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
  </div>
);
