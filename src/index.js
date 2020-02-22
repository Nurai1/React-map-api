import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';

import * as theme from './config/theme';
import App from './components/App';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('.main'),
);
