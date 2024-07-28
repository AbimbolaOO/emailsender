import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import { MailgunProvider } from './context/MailgunContext';
import GlobalStyles, { theme } from './globalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MailgunProvider>
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />

      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  </MailgunProvider>
);
