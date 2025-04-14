'use client';

import React from 'react';
import { useTheme } from '../../lib/theme/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setTheme('default')}
        className={`px-4 py-2 rounded ${theme === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Default
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitcher;
