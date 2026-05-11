import { Link,useLocation,} from "react-router-dom";

import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

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

        <div className="hidden items-center gap-8 md:flex">
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

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="text-2xl text-white md:hidden"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-5 border-t border-zinc-800 bg-black px-4 py-5 md:hidden">
          
          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className={`text-sm font-semibold ${
              location.pathname === "/"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Discover
          </Link>

          <Link
            to="/watchlist"
            onClick={() =>
              setMenuOpen(false)
            }
            className={`flex items-center gap-2 text-sm font-semibold ${
              location.pathname ===
              "/watchlist"
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            Watchlist

            <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-black">
              {watchlist.length}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;