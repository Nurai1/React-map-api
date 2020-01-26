import React from 'react';
import {render} from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'normalize.css';
import {ThemeProvider} from 'styled-components';

import * as theme from './config/theme';
import './css/base.css'
import App from "./components/App"

mapboxgl.accessToken = 'pk.eyJ1IjoiYmxpbmRtYW4yMCIsImEiOiJjazVqbW92aHowNG5qM2txazM4MHR1b3o0In0.OBRzj-3gGUTHipAJbpClPw';


render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>
  , document.querySelector(".main"))
