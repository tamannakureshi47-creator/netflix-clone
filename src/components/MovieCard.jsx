
import React from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiStar } from "react-icons/fi";
import { imageUrl } from "../api/tmdb";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block min-w-0"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#12141b] shadow-lg shadow-black/10 transition duration-300 group-hover:-translate-y-1 group-hover:border-red-500/50 group-hover:shadow-xl group-hover:shadow-red-950/20">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={imageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10 opacity-80 transition group-hover:opacity-100" />

          <div className="absolute left-2.5 top-2.5 rounded-md border border-white/15 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            Movie
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/30">
              <FiPlay fill="currentColor" size={20} />
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5">
          <h3 className="truncate text-sm font-bold text-white transition group-hover:text-red-400 sm:text-base">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">
              {movie.release_date
                ? movie.release_date.substring(0, 4)
                : "N/A"}
            </span>

            <span className="flex items-center gap-1 text-xs font-semibold text-amber-400">
              <FiStar fill="currentColor" size={12} />
              <span>Details</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
