import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const Search = ({ handlerIsOpen }) => {
  const searchRef = useRef();
  const router = useRouter();
  function handleSearch(event) {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      const search = searchRef.current.value.trim();
      if (handlerIsOpen) handlerIsOpen();
      if (search) router.push(`/search/${encodeURIComponent(search)}`);
    }
  }

  return (
    <div className="flex items-center w-full relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-md px-3 py-2 text-sm font-medium text-black bg-white focus:outline-none focus:shadow-[3px_3px_4px_0_#756cf4] hover:shadow-[3px_3px_4px_0_#756cf4]  transition-shadow duration-300"
        ref={searchRef}
        onKeyDown={handleSearch}
      />
      <button
        className="absolute right-0 h-full w-10 flex items-center justify-center"
        onClick={handleSearch}
        aria-label="search-button"
      >
        <SearchIcon sx={{ fontSize: 28 }} />
      </button>
    </div>
  );
};

export default Search;
