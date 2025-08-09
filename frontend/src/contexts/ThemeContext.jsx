import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Read theme from localStorage or default to false (light mode)
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
