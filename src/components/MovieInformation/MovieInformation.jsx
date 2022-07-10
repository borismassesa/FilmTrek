import React, { useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon , Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetRecommendationsQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from '.styles';
import { useGetMovieQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { MovieList } from ".."



const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen ]=  useState(false);

  const { data: recommendations , isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id});

  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  const addToFavorites = () => {

  };
  const addToWatchlist = () => {

  };

  if(isFetching){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        < CircularProgress size="8rem" />
      </Box>
    );
  }
  if(error){
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone bad go back</Link>
      </Box>
    );
  }


  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
      <img
        className={classes.poster}
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        alt={data?.title}
      />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({(data.release_date.split('-')[0])})
        </Typography>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom style={{marginLeft: '10px'}}>
              {data?.vote_average} / 10
            </Typography>

          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : '' }
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => (
            <Link 
              key={genre.name}
              className={classes.links}
              to="/" 
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}

              </Typography>
            </Link>
          ))}
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px'}}>
            Overview
          </Typography>
          <Typography style={{marginBottom: '2rem'}}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>Top cast </Typography>
          <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, index) => (
            character.profile_path && (
              <Grid key={index} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
                <img
                  className={classes.castImage}
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">
                  {character.character.split('/')[0]}
                </Typography>

              </Grid>
            )

          )).slice(0,6)}
          <Grid item container style={{marginTopn: '2rem'}}>
            <div className={classes.buttonContainer}>
                <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                  <ButtonGroup size="mdeium" variant="outlined">
                    <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={ < Language />}>Website</Button>
                    <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={ < MovieIcon />}>IMDB</Button>
                    <Button onclick = {() => setOpen(true)} target="_blank" href="#" endIcon={ < Theaters />}>Trailer</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                  <ButtonGroup sixe="small" variant="outlined">
                    <Button onClick={addToFavorites} endicon={isMovieFavorited ? <FavoriteBorderOutlined /> : <favorite /> }>
                      {isMovieFavorited ?  'Unfavorite' : 'Favorite'}
                    </Button>
                    <Button onClick={addToWatchlist} endicon={isMovieWatchlisted ? <Remove /> : <PlusOne /> }>
                      {/* {isMovieWatchlisted ?  'Remove from Watchlist' : 'Add to Watchlist'} */}
                      Watchlist
                    </Button>
                    <Button endIcon={< ArrowBack /> } sx={{ borderColor: 'primary.main'}}> 
                      <Typography style={{textDecoration: 'none'}} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>

                    </Button>
                  </ButtonGroup>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
        {/* //* Loop through the recommended movies */}
        {recommendations 
          ? < MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>
        }
        </Box>
        <Modal
          closeAfterTransiton
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
        >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoplay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
          
        </Modal>

      </Grid>
    </Grid>
  )
}

export default MovieInformation