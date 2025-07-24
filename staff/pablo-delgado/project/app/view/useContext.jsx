import { createContext, useState, useContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: null, level: 'error' });

  // Here we store the user who logs in
  const [user, setUser] = useState(null); // example: { name: "Lucía", email: "lucia@email.com" }

  return (
    <Context.Provider value={{ alert, setAlert, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
