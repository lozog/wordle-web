import { createGlobalStyle } from "styled-components";

export const colours = {
  black: "#121213",
  white: "#d7dadc",
  grey: "#565758",
  darkGrey: "#3a3a3c",
  yellow: "#b59f3b",
  green: "#538d4e"
}

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    color: ${colours.white};
  }

  html {
    background: ${colours.black};
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:focus{
      outline: none;
  }
`;
