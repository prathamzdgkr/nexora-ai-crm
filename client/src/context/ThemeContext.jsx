import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load saved theme from localStorage, default to 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('crm-theme') || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first to reset
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Check OS preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      // Add the explicitly chosen theme
      root.classList.add(theme);
    }

    // Save choice to localStorage
    localStorage.setItem('crm-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);