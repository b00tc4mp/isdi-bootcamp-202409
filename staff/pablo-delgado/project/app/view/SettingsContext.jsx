import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => (prev === 'es' ? 'en' : 'es'));

  return (
    <SettingsContext.Provider value={{ language, toggleLanguage, darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

export { SettingsContext };
