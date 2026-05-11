import { Link } from "react-router-dom";

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


  const handleWatchlist = () => {

    if (exists) {

      dispatch(removeMovie(movie.id));

    } else {

      dispatch(addMovie(movie));
    }
  };


  return (

    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-zinc-700
      "
    >

      {/* IMAGE */}

      <Link to={`/movie/${movie.id}`}>

        <div className="overflow-hidden">

          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="
              aspect-[2/3]
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />

        </div>

      </Link>


      {/* CONTENT */}

      <div className="space-y-4 p-4">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h2 className="
              line-clamp-1
              text-base
              font-semibold
              text-white
              md:text-lg
            ">
              {movie.title}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {movie.release_date?.split("-")[0]}
            </p>

          </div>


          {/* RATING */}

          <div className="
            flex
            items-center
            gap-1
            rounded-xl
            bg-zinc-900
            px-3
            py-2
            text-sm
            font-semibold
            text-yellow-400
          ">
            ⭐
            {movie.vote_average?.toFixed(1)}
          </div>

        </div>


        {/* BUTTON */}

        <button
          onClick={handleWatchlist}
          className={`
            w-full
            rounded-2xl
            py-3
            text-sm
            font-semibold
            transition
            ${
              exists
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }
          `}
        >

          {exists
            ? "Remove From Watchlist"
            : "Add To Watchlist"}

        </button>

      </div>

    </div>
  );
};

export default MovieCard;