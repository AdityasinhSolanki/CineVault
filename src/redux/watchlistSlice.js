import { createSlice } from "@reduxjs/toolkit";

const savedMovies =
  JSON.parse(
    localStorage.getItem("watchlist")
  ) || [];

const saveToLocalStorage = (movies) => {

  localStorage.setItem(
    "watchlist",
    JSON.stringify(movies)
  );
};

const initialState = {
  movies: savedMovies,
};

const watchlistSlice = createSlice({

  name: "watchlist",

  initialState,

  reducers: {

    addMovie: (state, action) => {

      const exists = state.movies.find(
        (movie) =>
          movie.id === action.payload.id
      );

      if (!exists) {

        state.movies.unshift({
          ...action.payload,
          watched: false,
          addedAt: Date.now(),
        });

        saveToLocalStorage(state.movies);
      }
    },

    removeMovie: (state, action) => {

      state.movies = state.movies.filter(
        (movie) =>
          movie.id !== action.payload
      );

      saveToLocalStorage(state.movies);
    },

    toggleWatched: (state, action) => {

      const movie = state.movies.find(
        (movie) =>
          movie.id === action.payload
      );

      if (movie) {

        movie.watched = !movie.watched;

        saveToLocalStorage(state.movies);
      }
    },

    clearWatchlist: (state) => {

      state.movies = [];

      saveToLocalStorage(state.movies);
    },

  },
});

export const {
  addMovie,
  removeMovie,
  toggleWatched,
  clearWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;