import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { HomePage } from '@Views/home/page';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  table {
    border-collapse: collapse;
  }
  
  body {
    background-color: #f2f2f2;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <HomePage />
  </React.Fragment>
);

export { App };
