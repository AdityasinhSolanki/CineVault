import axios from "axios";

const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";


// GET GENRES

export const getGenres = async () => {

  const response = await axios.get(
    `${BASE_URL}/genre/movie/list`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );

  return response.data.genres;
};


// SEARCH MOVIES

export const searchMovies = async (
  query,
  page = 1
) => {

  const response = await axios.get(
    `${BASE_URL}/search/movie`,
    {
      params: {
        api_key: API_KEY,
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

    const response = await axios.get(
      `${BASE_URL}/trending/movie/week`,
      {
        params: {
          api_key: API_KEY,
          page,
        },
      }
    );

    return response.data.results;
  };


// MOVIE DETAILS

export const getMovieDetails =
  async (id) => {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    return response.data;
  };