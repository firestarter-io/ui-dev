import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /* ---------- General Page Styles ---------- */

  html {
    box-sizing: border-box;
    overflow-x: hidden;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

`;

export default GlobalStyles;
