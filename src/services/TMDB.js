import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),

    //*Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //*Get Movies by Search
        if(searchQuery){
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //*Get Movies by category
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "string"){
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }
        //* Get Movies by Genre
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === "number"){
          return `discover/movie?with_genre=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }
        //* Get Movies by Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`

      },
    }),
    //* Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    //* Get User Specific Lists
    getRecommendations: builder.query({
      query: (movie_id, list) => `/movie/${movie_id}?api_key=${tmdbApiKey}`
    }),
    //* Get Actors Details
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by Actors ID
    getMoviesByActorId: builder.query({
      query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMovieQuery,
  useGetMoviesQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;