import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import {
  getGenres,
  getMoviesByGenre,
  getTrendingMovies,
  searchMovies,
} from "../services/tmdb";

import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedGenre]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenres();
  }, []);

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
        } else if (selectedGenre) {
          data = await getMoviesByGenre(
            selectedGenre,
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
  }, [debouncedQuery, page, selectedGenre]);

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

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() =>
              setSelectedGenre(null)
            }
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
              selectedGenre === null
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            All
          </button>

          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() =>
                setSelectedGenre(genre.id)
              }
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedGenre === genre.id
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;