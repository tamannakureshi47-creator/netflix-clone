
import React, { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import CategoryRow from "../components/CategoryRow";
import { fetchFromTMDB } from "../api/tmdb";

const Home = () => {
  const [categories, setCategories] = useState({
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);

        const trendingData = await fetchFromTMDB("trending/movie/week");
        const topRatedData = await fetchFromTMDB("movie/top_rated");
        const actionData = await fetchFromTMDB(
          "discover/movie?with_genres=28&sort_by=popularity.desc"
        );
        const comedyData = await fetchFromTMDB(
          "discover/movie?with_genres=35&sort_by=popularity.desc"
        );

        const usedIds = new Set();

        const getUniqueMovies = (movies, limit = 10) => {
          const uniqueMovies = [];

          for (const movie of movies || []) {
            if (
              movie &&
              movie.id &&
              movie.poster_path &&
              !usedIds.has(movie.id)
            ) {
              usedIds.add(movie.id);
              uniqueMovies.push(movie);
            }

            if (uniqueMovies.length === limit) {
              break;
            }
          }

          return uniqueMovies;
        };

        const trending = getUniqueMovies(trendingData.results, 10);
        const topRated = getUniqueMovies(topRatedData.results, 10);
        const action = getUniqueMovies(actionData.results, 10);
        const comedy = getUniqueMovies(comedyData.results, 10);

        setCategories({
          trending,
          topRated,
          action,
          comedy,
        });
      } catch (error) {
        console.error("Home movies error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <HeroSlider />

      <div className="relative z-20 mx-auto max-w-[1600px] pb-16">
        {loading ? (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4 text-gray-400">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
            <p className="text-sm font-medium tracking-wide">
              Discovering your next favorite movie...
            </p>
          </div>
        ) : (
          <>
            <div id="trending" className="scroll-mt-24">
              <CategoryRow
                title="Trending Now"
                movies={categories.trending}
              />
            </div>

            <div id="top-rated" className="scroll-mt-24">
              <CategoryRow
                title="Top Rated"
                movies={categories.topRated}
              />
            </div>

            <div id="movies" className="scroll-mt-24">
              <CategoryRow
                title="Action & Adventure"
                movies={categories.action}
              />
            </div>

            <CategoryRow
              title="Comedy Picks"
              movies={categories.comedy}
            />
          </>
        )}

        <footer className="mx-4 mt-16 border-t border-white/[0.07] px-2 pt-7 text-center sm:mx-10">
          <p className="text-sm font-semibold text-gray-400">
            My<span className="text-red-500">NetFlix</span>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Discover stories. Find your next favorite.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Home;
