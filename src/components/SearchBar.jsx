
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiLoader } from "react-icons/fi";
import { fetchFromTMDB, imageUrl } from "../api/tmdb";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);

        const data = await fetchFromTMDB(
          `search/movie?query=${encodeURIComponent(query)}`
        );

        setMovies(data.results?.slice(0, 6) || []);
      } catch (error) {
        console.error("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      searchMovies();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full sm:w-64 lg:w-72">
      <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 transition focus-within:border-red-500/70 focus-within:bg-white/[0.09] focus-within:ring-2 focus-within:ring-red-500/10">
        <FiSearch className="shrink-0 text-gray-400" size={18} />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />

        {loading ? (
          <FiLoader className="shrink-0 animate-spin text-red-400" size={16} />
        ) : query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="shrink-0 text-gray-400 transition hover:text-white"
          >
            <FiX size={17} />
          </button>
        ) : null}
      </div>

      {query.trim() && (
        <div className="absolute right-0 top-full z-[60] mt-3 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/10 bg-[#11131a]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:w-80">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
              Search Results
            </p>
            <span className="text-xs text-gray-500">
              {loading ? "Searching..." : `${movies.length} found`}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 px-4 py-8 text-sm text-gray-400">
              <FiLoader className="animate-spin text-red-500" size={18} />
              Searching movies...
            </div>
          ) : movies.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto p-2">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Link
                    to={`/movie/${movie.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[0.07]"
                  >
                    <img
                      src={imageUrl(movie.poster_path, "w92")}
                      alt={movie.title}
                      className="h-14 w-10 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {movie.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {movie.release_date
                          ? movie.release_date.substring(0, 4)
                          : "N/A"}
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-red-400">
                      View
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <FiSearch className="mx-auto mb-3 text-gray-600" size={25} />
              <p className="text-sm font-semibold text-gray-300">
                No movies found
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try another movie title.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
