import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <PageWrapper>
              <MovieDetails />
            </PageWrapper>
          }
        />

        <Route
          path="/watchlist"
          element={
            <PageWrapper>
              <Watchlist />
            </PageWrapper>
          }
        />

      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">

        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          
          <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl"></div>

          <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-zinc-500/10 blur-3xl"></div>

        </div>

        {/* CONTENT */}

        <div className="relative z-10">
          <Navbar />
          <AnimatedRoutes />
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;