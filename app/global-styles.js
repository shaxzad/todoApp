import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {

    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .list-application
  {
    margin-top: 50px;
  }
  .badge-design
  {
    width: 40px;
  }
  .badge-design .ant-badge-status-dot {
    width: 15px;
    height: 15px;
  }
  .btn-style
  {
    margin-top: 20px;
    float: right;
  }
`;

export default GlobalStyle;
