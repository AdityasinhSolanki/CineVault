import { createSlice } from "@reduxjs/toolkit";

const savedMovies =
  JSON.parse(
    localStorage.getItem("watchlist")
  ) || [];

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
        state.movies.push({
          ...action.payload,
          watched: false,
        });

        localStorage.setItem(
          "watchlist",
          JSON.stringify(state.movies)
        );
      }
    },

    removeMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) =>
          movie.id !== action.payload
      );

      localStorage.setItem(
        "watchlist",
        JSON.stringify(state.movies)
      );
    },

    toggleWatched: (state, action) => {
      const movie = state.movies.find(
        (movie) =>
          movie.id === action.payload
      );

      if (movie) {
        movie.watched = !movie.watched;

        localStorage.setItem(
          "watchlist",
          JSON.stringify(state.movies)
        );
      }
    },
  },
});

export const {
  addMovie,
  removeMovie,
  toggleWatched,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;