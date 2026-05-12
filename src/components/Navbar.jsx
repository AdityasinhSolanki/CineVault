import {
  Link,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";

const Navbar = () => {

  const location = useLocation();

  const watchlist = useSelector(
    (state) => state.watchlist.movies
  );

  return (

    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-black/60 backdrop-blur-2xl">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]"></div>

      <nav className="relative flex items-center justify-between px-4 py-5 md:px-8 xl:px-14">

        {/* LOGO */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >

          <Link
            to="/"
            className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-3xl font-black tracking-tight text-transparent"
          >

            CineVault

          </Link>

        </motion.div>

        {/* NAV LINKS */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-2 backdrop-blur-xl md:gap-5"
        >

          {/* DISCOVER */}

          <Link
            to="/"
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-white text-black shadow-lg"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >

            Discover

          </Link>

          {/* WATCHLIST */}

          <Link
            to="/watchlist"
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              location.pathname ===
              "/watchlist"
                ? "bg-white text-black shadow-lg"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >

            Watchlist

            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              location.pathname ===
              "/watchlist"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}>

              {watchlist.length}

            </span>

          </Link>

        </motion.div>

      </nav>

    </header>
  );
};

export default Navbar;