import { default as React } from 'react';

interface ThemeContextProps {
    theme: 'default' | 'dark';
    setTheme: (theme: 'default' | 'dark') => void;
}
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => ThemeContextProps;
export {};
