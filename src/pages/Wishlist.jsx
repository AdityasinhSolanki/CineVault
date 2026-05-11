import { useDispatch, useSelector } from "react-redux";

import {
  removeMovie,
  toggleWatched,
} from "../redux/watchlistSlice";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

const Watchlist = () => {
  const dispatch = useDispatch();

  const movies = useSelector(
    (state) => state.watchlist.movies
  );

  if (movies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        <div>
          <h1 className="text-4xl font-black">
            Your Watchlist Is Empty
          </h1>

          <p className="mt-4 text-zinc-400">
            Save movies and they’ll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            My Watchlist
          </h1>

          <p className="mt-2 text-zinc-400">
            Movies you saved for later.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-44 w-28 rounded-xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {movie.title}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    {movie.release_date?.split(
                      "-"
                    )[0]}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() =>
                      dispatch(toggleWatched(movie.id))
                    }
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      movie.watched
                        ? "bg-green-500 text-black"
                        : "bg-zinc-800 text-white"
                    }`}
                  >
                    {movie.watched
                      ? "Watched"
                      : "Mark As Watched"}
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeMovie(movie.id))
                    }
                    className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Watchlist;