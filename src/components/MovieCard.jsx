import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addMovie,
  removeMovie,
} from "../redux/watchlistSlice";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {

  const dispatch = useDispatch();

  const watchlist = useSelector(
    (state) => state.watchlist.movies
  );

  const exists = watchlist.some(
    (item) => item.id === movie.id
  );

  const savedMovie = watchlist.find(
    (item) => item.id === movie.id
  );

  const watched = savedMovie?.watched;

  const handleWatchlist = () => {

    if (exists) {

      dispatch(removeMovie(movie.id));

    } else {

      dispatch(addMovie(movie));
    }
  };

  return (

    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_45px_rgba(255,255,255,0.06)]"
    >

      {/* GLOW */}

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent"></div>

      </div>

      {/* IMAGE */}

      <Link to={`/movie/${movie.id}`}>

        <div className="relative overflow-hidden">

          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>

          {/* WATCHED TAG */}

          {watched && (

            <div className="absolute left-3 top-3 rounded-full border border-green-500/20 bg-black/60 px-3 py-1 text-xs font-semibold text-green-400 backdrop-blur-xl">

              Watched

            </div>

          )}

          {/* RATING */}

          <div className="absolute bottom-3 right-3 rounded-xl border border-zinc-700/50 bg-black/60 px-3 py-2 text-xs font-bold text-yellow-400 backdrop-blur-xl md:text-sm">

            ⭐ {movie.vote_average?.toFixed(1)}

          </div>

        </div>

      </Link>

      {/* CONTENT */}

      <div className="space-y-4 p-4">

        <div>

          <h2 className="line-clamp-1 text-sm font-bold leading-5 text-white md:text-lg">

            {movie.title}

          </h2>

          <p className="mt-2 text-sm text-zinc-500">

            {movie.release_date?.split("-")[0]}

          </p>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleWatchlist}
          className={`w-full rounded-2xl py-3 text-xs font-semibold transition-all duration-300 md:text-sm ${
            exists
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-zinc-800 text-white hover:bg-zinc-700"
          }`}
        >

          {exists
            ? "Remove From Watchlist"
            : "Add To Watchlist"}

        </button>

      </div>

    </motion.div>
  );
};

export default MovieCard;