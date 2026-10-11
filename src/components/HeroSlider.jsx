
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiPlus, FiInfo, FiStar } from "react-icons/fi";
import { fetchFromTMDB, imageUrl } from "../api/tmdb";

const HeroSlider = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchFromTMDB("trending/movie/week");
      setItems(data.results.slice(0, 5));
    })();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#08090d]">
      <div className="relative h-[620px] sm:h-[680px] lg:h-[760px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === 0 ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            style={{
              backgroundImage: `url(${imageUrl(item.backdrop_path, "w1280")})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 to-[#08090d]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/25 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/60 to-transparent" />

            <div className="relative z-20 mx-auto flex h-full max-w-[1600px] items-end px-5 pb-24 pt-32 sm:px-10 sm:pb-28 lg:items-center lg:px-16 lg:pb-12">
              <div className="max-w-2xl">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-300">
                    Trending This Week
                  </span>
                </div>

                <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
                  {item.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                    <FiStar fill="currentColor" />
                    Featured Movie
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <span>
                    {item.release_date
                      ? item.release_date.substring(0, 4)
                      : "N/A"}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <span className="rounded border border-white/20 px-2 py-0.5 text-xs">
                    HD
                  </span>
                </div>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  {item.overview}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={`/movie/${item.id}`}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                  >
                    <FiPlay fill="currentColor" size={18} />
                    Play Now
                  </Link>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    <FiPlus size={19} />
                    My List
                  </button>

                  <Link
                    to={`/movie/${item.id}`}
                    aria-label={`More information about ${item.title}`}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/25 text-white backdrop-blur-md transition hover:bg-white/15"
                  >
                    <FiInfo size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-[#08090d] to-transparent" />
      </div>
    </section>
  );
};

export default HeroSlider;
