import axios from "axios";

const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


// SEARCH MOVIES

export const searchMovies = async (
  query,
  page = 1
) => {

  const response = await api.get(
    "/search/movie",
    {
      params: {
        query,
        page,
      },
    }
  );

  return response.data.results;
};


// TRENDING MOVIES

export const getTrendingMovies =
  async (page = 1) => {

    const response = await api.get(
      "/trending/movie/week",
      {
        params: {
          page,
        },
      }
    );

    return response.data.results;
  };


// MOVIE DETAILS

export const getMovieDetails =
  async (id) => {

    const response = await api.get(
      `/movie/${id}`
    );

    return response.data;
  };


// SIMILAR MOVIES

export const getSimilarMovies =
  async (id) => {

    const response = await api.get(
      `/movie/${id}/similar`
    );

    return response.data.results;
  };


// MOVIE VIDEOS / TRAILERS

export const getMovieVideos =
  async (id) => {

    const response = await api.get(
      `/movie/${id}/videos`
    );

    return response.data.results;
  };