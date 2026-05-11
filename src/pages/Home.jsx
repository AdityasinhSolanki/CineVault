import { useEffect, useState } from "react";
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
    <section className="min-h-screen bg-black text-white">
      <div className="w-full px-4 py-10 md:px-8 xl:px-14">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
              CineVault
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-6xl xl:text-7xl">
              Discover Trending Movies
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Browse trending films, search your
              favorites, and build a personal
              watchlist.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-white outline-none transition focus:border-zinc-500 lg:w-[420px]"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        )}

       {!loading && !error && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

            {[...Array(12)].map((_, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
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