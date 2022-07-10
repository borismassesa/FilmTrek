import React, {useState, useEffect } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { useGetMovieQuery } from '../../services/TMDB'
import { MovieList, Pagination } from '..'

const Movies = () => {
  const [page,setPage]= useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMovieQuery({genreIdOrCategoryName, page, searchQuery});
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 16 : 18;

  if(isFetching){
    return (
      <Box display="flex" justifyContent="center">
      <CircularProgress size="4rem"/>

      </Box>
    )
  }
  if(!data.results.length){
    return (
      <Box displayu="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br/>
          Please search for something else.
        </Typography>

      </Box>
    );
  }
  if(error){
    return (
      'An error has occured.'
    )
  }
  
  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies}/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;