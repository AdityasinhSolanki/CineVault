import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import MovieCard from "../components/MovieCard";

import {
  getTrendingMovies,
  searchMovies,
} from "../services/tmdb";

import useDebounce from "../hooks/useDebounce";

const Home = () => {

  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {

    setPage(1);

  }, [debouncedQuery]);

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        setLoading(true);

        setError("");

        let data = [];

        if (debouncedQuery.trim()) {

          data = await searchMovies(
            debouncedQuery,
            page
          );

        } else {

          data = await getTrendingMovies(page);
        }

        setMovies((prev) => {

          if (page === 1) return data;

          return [...prev, ...data];

        });

      } catch (err) {

        setError("Failed to load movies.");

      } finally {

        setLoading(false);
      }
    };

    fetchMovies();

  }, [debouncedQuery, page]);

  useEffect(() => {

    const handleScroll = () => {

      if (loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {

        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, [loading]);

  return (

    <section className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* HERO GRADIENT */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]"></div>

      <div className="relative z-10 w-full px-4 py-10 md:px-8 xl:px-14">

        {/* HERO SECTION */}

        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-zinc-500">
              CineVault
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] md:text-6xl xl:text-7xl">

              Discover
              <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                {" "}Trending Movies
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">

              Browse trending films, search your favorites,
              and build your premium personal watchlist
              experience.

            </p>

          </motion.div>

          {/* SEARCH */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-auto"
          >

            <div className="relative">

              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 px-6 py-4 pr-14 text-white backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-zinc-600 focus:shadow-[0_0_40px_rgba(255,255,255,0.08)] lg:w-[420px]"
              />

              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">
                🔍
              </div>

            </div>

          </motion.div>

        </div>

        {/* ERROR */}

        {error && (

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-red-400 backdrop-blur-xl">

            {error}

          </div>
        )}

        {/* MOVIES GRID */}

        {!loading && !error && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          >

            {movies.map((movie, index) => (

              <motion.div
                key={`${movie.id}-${index}`}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.03,
                }}
              >

                <MovieCard movie={movie} />

              </motion.div>

            ))}

          </motion.div>
        )}

        {/* SKELETON LOADING */}

        {loading && (

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

            {[...Array(12)].map((_, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl"
              >

                <div className="aspect-[2/3] animate-pulse bg-zinc-800"></div>

                <div className="space-y-3 p-3 md:p-4">

                  <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800"></div>

                  <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-800"></div>

                  <div className="h-10 w-full animate-pulse rounded-2xl bg-zinc-800"></div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </section>
  );
};

export default Home;