import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="relative h-[300px] w-full overflow-hidden md:h-[500px]">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 -mt-24 grid gap-8 px-4 pb-16 md:-mt-56 md:grid-cols-[300px_1fr] md:px-8 xl:px-14">
        
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="mx-auto w-full max-w-[260px] rounded-3xl shadow-2xl md:max-w-none"
        />

        <div>
          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-400 md:text-base">
            <span>
              {movie.release_date?.split("-")[0]}
            </span>

            <span>•</span>

            <span>{movie.runtime} mins</span>

            <span>•</span>

            <span>
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 md:px-4 md:py-2 md:text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-300 md:mt-8 md:text-lg md:leading-8">
            {movie.overview}
          </p>

          <button
            onClick={handleWatchlist}
            className={`mt-8 rounded-2xl px-6 py-3 text-sm font-semibold transition md:px-7 md:py-4 md:text-base ${
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
      </div>
    </section>
  );
};

export default MovieDetails;