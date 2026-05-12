import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import {
  addMovie,
  removeMovie,
} from "../redux/watchlistSlice";

import { getMovieDetails } from "../services/tmdb";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const watchlist = useSelector(
    (state) => state.watchlist.movies
  );

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchMovie = async () => {

      try {

        const data = await getMovieDetails(id);

        setMovie(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchMovie();

  }, [id]);

  const exists = watchlist.some(
    (item) => item.id === movie?.id
  );

  const handleWatchlist = () => {

    if (exists) {

      dispatch(removeMovie(movie.id));

    } else {

      dispatch(addMovie(movie));
    }
  };

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-black">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-800 border-t-white"></div>

      </div>
    );
  }

  return (

    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKDROP */}

      <div className="absolute inset-0">

        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

      </div>

      {/* CONTENT */}

      <div className="relative z-10 px-4 pb-16 pt-10 md:px-8 xl:px-14">

        <div className="grid gap-10 md:grid-cols-[320px_1fr] md:items-start">

          {/* POSTER */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-[300px] md:max-w-none"
          >

            <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/50 shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-xl">

              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover"
              />

            </div>

          </motion.div>

          {/* DETAILS */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >

            {/* TITLE */}

            <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">

              {movie.title}

            </h1>

            {/* INFO */}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-400 md:text-base">

              <span>
                {movie.release_date?.split("-")[0]}
              </span>

              <span>•</span>

              <span>
                {movie.runtime} mins
              </span>

              <span>•</span>

              <span className="font-semibold text-yellow-400">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

            </div>

            {/* GENRES */}

            <div className="mt-6 flex flex-wrap gap-3">

              {movie.genres?.map((genre) => (

                <span
                  key={genre.id}
                  className="rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl"
                >

                  {genre.name}

                </span>

              ))}

            </div>

            {/* OVERVIEW */}

            <p className="mt-8 max-w-4xl text-sm leading-8 text-zinc-300 md:text-lg">

              {movie.overview}

            </p>

            {/* BUTTON */}

            <div className="mt-10 flex justify-center md:justify-start">

              <button
                onClick={handleWatchlist}
                className={`rounded-2xl px-7 py-4 text-sm font-semibold transition-all duration-300 md:text-base ${
                  exists
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >

                {exists
                  ? "Remove From Watchlist"
                  : "Add To Watchlist"}

              </button>

            </div>

            {/* EXTRA STATS */}

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 backdrop-blur-xl">

                <p className="text-sm text-zinc-500">
                  Language
                </p>

                <h3 className="mt-2 text-lg font-bold uppercase text-white">
                  {movie.original_language}
                </h3>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 backdrop-blur-xl">

                <p className="text-sm text-zinc-500">
                  Popularity
                </p>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {Math.round(movie.popularity)}
                </h3>

              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 backdrop-blur-xl col-span-2 sm:col-span-1">

                <p className="text-sm text-zinc-500">
                  Votes
                </p>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {movie.vote_count}
                </h3>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default MovieDetails;