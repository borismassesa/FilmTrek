import React from 'react'
import  ReactDOM  from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

const theme = createTheme({});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ThemeProvider>, 
  document.getElementById("root")
  );