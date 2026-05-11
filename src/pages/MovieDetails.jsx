import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../services/tmdb";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto -mt-56 grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[300px_1fr]">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-3xl shadow-2xl"
        />

        <div>
          <h1 className="text-5xl font-black leading-tight">
            {movie.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
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

          <div className="mt-6 flex flex-wrap gap-3">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;