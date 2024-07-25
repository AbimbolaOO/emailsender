import ReactDOM from 'react-dom/client';

import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import GlobalStyles, { theme } from './globalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <Global styles={GlobalStyles} />
    <App />
  </ThemeProvider>
);
