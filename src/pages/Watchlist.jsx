import { motion } from "framer-motion";

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

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-center text-white">

        {/* BACKGROUND GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10"
        >

          <h1 className="text-4xl font-black md:text-6xl">
            Your Watchlist Is Empty
          </h1>

          <p className="mt-5 text-base text-zinc-400 md:text-lg">
            Save movies and build your premium collection.
          </p>

        </motion.div>

      </section>
    );
  }

  return (

    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-10 text-white md:px-8 xl:px-14">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >

          <h1 className="text-4xl font-black md:text-6xl">
            My Watchlist
          </h1>

          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            Movies you saved for later.
          </p>

        </motion.div>

        {/* MOVIES GRID */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {movies.map((movie, index) => (

            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-4 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >

              {/* WATCHED BADGE */}

              {movie.watched && (

                <div className="absolute right-4 top-4 z-20 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400 backdrop-blur-xl">

                  Watched

                </div>
              )}

              <div className="flex gap-4">

                {/* POSTER */}

                <div className="overflow-hidden rounded-2xl">

                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="h-44 w-28 object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* CONTENT */}

                <div className="flex flex-1 flex-col justify-between">

                  <div>

                    <h2 className="line-clamp-2 text-xl font-black leading-tight text-white">

                      {movie.title}

                    </h2>

                    <p className="mt-3 text-sm text-zinc-400">

                      {movie.release_date?.split("-")[0]}

                    </p>

                    <div className="mt-4 inline-flex items-center rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-yellow-400">

                      ⭐ {movie.vote_average?.toFixed(1)}

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="mt-5 flex flex-col gap-3">

                    <button
                      onClick={() =>
                        dispatch(toggleWatched(movie.id))
                      }
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        movie.watched
                          ? "bg-green-500 text-black hover:bg-green-400"
                          : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                    >

                      {movie.watched
                        ? "Marked As Watched"
                        : "Mark As Watched"}

                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeMovie(movie.id))
                      }
                      className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
                    >

                      Remove

                    </button>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Watchlist;