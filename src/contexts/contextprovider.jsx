import { useContext, useState, createContext } from "react";

// Define the context's initial state and types (optional if using TypeScript)
const StateContext = createContext({
  user: null,
  token: null,
  setUser: (user) => {},
  setToken: (token) => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [token, _setToken] = useState(() => localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);
