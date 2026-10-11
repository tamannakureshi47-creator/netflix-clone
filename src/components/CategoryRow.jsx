
import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import MovieCard from "./MovieCard";

const CategoryRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  return (
    <section className="my-10 w-full sm:my-14">
      <div className="mb-5 flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-9 w-1 shrink-0 rounded-full bg-red-500 shadow-lg shadow-red-500/30" />

          <div className="min-w-0">
            <h2 className="truncate text-lg font-extrabold tracking-tight text-white sm:text-2xl">
              {title}
            </h2>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Handpicked for you
            </p>
          </div>

          <FiArrowUpRight className="hidden text-gray-600 sm:block" size={18} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label={`Scroll ${title} left`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-red-500 hover:bg-red-600 hover:text-white sm:h-10 sm:w-10"
          >
            <FiChevronLeft size={21} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            aria-label={`Scroll ${title} right`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-red-500 hover:bg-red-600 hover:text-white sm:h-10 sm:w-10"
          >
            <FiChevronRight size={21} />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-3.5 overflow-x-auto px-4 py-3 sm:gap-5 sm:px-8 lg:px-10"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[145px] flex-shrink-0 sm:w-[175px] lg:w-[195px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;
