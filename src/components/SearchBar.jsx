// src/components/SearchBar.jsx
import useStore from '../store/useStore';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, showFavoritesOnly, toggleShowFavoritesOnly } = useStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search contacts..."
        />
      </div>
      <div className="flex items-center">
        <input
          id="showFavorites"
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={toggleShowFavoritesOnly}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="showFavorites" className="ml-2 block text-sm text-gray-900">
          Show Favorites Only
        </label>
      </div>
    </div>
  );
};

export default SearchBar;