import React from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './styles';

import { Actors, Movies, MovieInformation, Navbar, Profile } from '.'


const App = () => {
  const classes = useStyles();


  return (
    <div>
    <CssBaseline/>
    < Navbar />
    <main className={classes.content}>
    <div className={classes.toolbar}></div>
      <Switch>
        <Route exact path="/movie/:id"> 
          <MovieInformation />
        </Route>
        <Route exact path="/actors/:id"> 
          <Actors />
        </Route>
        <Route exact path={['/','/approved']}>
          <Movies />
        </Route>
        <Route exact path='/profile/:id'>
          <Profile />
        </Route>
      </Switch>
    </main>
    </div>
  )
}

export default App