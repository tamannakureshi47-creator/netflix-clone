
import React from "react";
import { Link } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/[0.06] bg-[#08090d]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-lg font-black text-white shadow-lg shadow-red-600/25">
            M
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            My<span className="text-red-500">NetFlix</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-400 lg:flex">
          <Link to="/" className="text-white transition hover:text-red-400">
            Home
          </Link>
          <a href="#trending" className="transition hover:text-white">
            TV Shows
          </a>
          <a href="#movies" className="transition hover:text-white">
            Movies
          </a>
          <a href="#top-rated" className="transition hover:text-white">
            Top Rated
          </a>
        </nav>

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="min-w-0 flex-1 sm:flex-none">
            <SearchBar />
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white sm:flex"
          >
            <FiBell size={19} />
          </button>
         
        </div>
      </div>
    </header>
  );
};

export default Navbar;
