/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      buttonColor: string;
      mainColor: string;
      secondaryColor: string;
      disableColor: string;
    };
  }
}

export const theme: Theme = {
  palette: {
    buttonColor: '#67032f',
    mainColor: 'rebeccapurple',
    secondaryColor: '#e8edf6',
    disableColor: '#d1c5c5',
  },
};

const GlobalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    font-size: 1em;
  }
  html,
  body {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: 'Poppins', sans-serif, 'Work Sans', sans-serif;
    font-weight: 400;
    color: black;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  #root,
  #__next {
    isolation: isolate;
  }
`;

export default GlobalStyles;
