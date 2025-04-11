import React from 'react';
import { I18nProvider } from '../lib/i18n/I18nProvider';
import { ThemeProvider } from '../lib/theme/ThemeProvider';
import Home from './index';

const App: React.FC = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </I18nProvider>
  );
};

export default App;
