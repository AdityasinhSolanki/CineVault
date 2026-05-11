import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/movie/:id" element={<MovieDetails />}/>
          <Route  path="/watchlist" element={<Watchlist />}/>         
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;