import React from 'react'
import  ReactDOM  from 'react-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import App from './components/App'
import store from './app/store'
import './index.css'

const theme = createTheme({});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ThemeProvider>
  </Provider>, 
  document.getElementById("root")
  );