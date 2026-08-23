'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      document.documentElement.classList.toggle(
        'dark',
        storedTheme === 'dark',
      );
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const initialTheme = prefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      'dark',
      initialTheme === 'dark',
    );
  }, []);

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === 'light' ? 'dark' : 'light';

      window.localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle(
        'dark',
        nextTheme === 'dark',
      );

      return nextTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
