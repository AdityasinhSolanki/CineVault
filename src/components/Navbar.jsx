import {  Link,  useLocation,} from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();

  const watchlist = useSelector(
    (state) => state.watchlist.movies
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/70 backdrop-blur-xl">
      <nav className="flex items-center justify-between px-4 py-5 md:px-8 xl:px-14">
        
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-white"
        >
          CineVault
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <Link
            to="/"
            className={`text-sm font-semibold transition hover:text-white ${
              location.pathname === "/"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Discover
          </Link>

          <Link
            to="/watchlist"
            className={`flex items-center gap-2 text-sm font-semibold transition hover:text-white ${
              location.pathname ===
              "/watchlist"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Watchlist

            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black">
              {watchlist.length}
            </span>
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;