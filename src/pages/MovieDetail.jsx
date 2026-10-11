
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiPlay, FiStar, FiClock, FiGlobe } from "react-icons/fi";
import { fetchFromTMDB, imageUrl } from "../api/tmdb";

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);

        const movieData = await fetchFromTMDB(`movie/${id}`);
        const videoData = await fetchFromTMDB(`movie/${id}/videos`);

        setMovie(movieData);

        const trailerVideo = videoData.results?.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        );

        const anyTrailer = videoData.results?.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        setTrailer(trailerVideo || anyTrailer || null);
      } catch (error) {
        console.error("Movie detail error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
          <p className="text-sm font-medium text-gray-400">
            Loading movie details...
          </p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090d] px-5 text-center">
        <div>
          <h1 className="text-3xl font-black text-white">
            Movie not found
          </h1>
          <p className="mt-3 text-gray-400">
            This movie could not be loaded.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <section className="relative">
        {movie.backdrop_path && (
          <div
            className="absolute inset-0 h-[620px] bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${imageUrl(movie.backdrop_path, "w1280")})`,
            }}
          />
        )}

        <div className="absolute inset-0 h-[620px] bg-gradient-to-r from-[#08090d] via-[#08090d]/85 to-[#08090d]/50" />
        <div className="absolute inset-0 h-[620px] bg-gradient-to-b from-transparent via-[#08090d]/50 to-[#08090d]" />

        <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-14">
          <Link
            to="/"
            className="mb-9 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-gray-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="grid items-start gap-9 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-14">
            <div className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                <img
                  src={imageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="block aspect-[2/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 pt-1 sm:pt-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Movie Details
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-base italic leading-7 text-gray-400 sm:text-lg">
                  "{movie.tagline}"
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm font-bold text-amber-400">
                  <FiStar fill="currentColor" />
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </span>

                <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-gray-300">
                  {movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"}
                </span>

                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-gray-300">
                    <FiClock />
                    {movie.runtime} min
                  </span>
                )}
              </div>

              {movie.genres?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-xl font-bold text-white">
                  Overview
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-8 text-gray-300 sm:text-base">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {movie.original_language && (
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <FiGlobe />
                      Language
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-200">
                      {movie.original_language.toUpperCase()}
                    </p>
                  </div>
                )}

                {movie.status && (
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Release Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-200">
                      {movie.status}
                    </p>
                  </div>
                )}
              </div>

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-500"
                >
                  <FiPlay fill="currentColor" size={17} />
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-10 lg:px-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-red-500" />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Official Trailer
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Watch the preview
            </p>
          </div>
        </div>

        {trailer ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131a] p-1.5 shadow-2xl shadow-black/30">
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                title={`${movie.title} Trailer`}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-16 text-center">
            <FiPlay className="mx-auto mb-4 text-gray-600" size={32} />
            <p className="font-semibold text-gray-300">
              Trailer not available
            </p>
            <p className="mt-2 text-sm text-gray-500">
              There is no trailer available for this movie right now.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default MovieDetail;
