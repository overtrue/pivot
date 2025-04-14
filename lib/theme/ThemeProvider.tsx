'use client';

import React, { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
  theme: 'default' | 'dark';
  setTheme: (theme: 'default' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'default' | 'dark'>('default');

  // 将 theme 添加到 body 或 html 的逻辑可以在这里实现，或者通过 context 传递给 layout
  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
