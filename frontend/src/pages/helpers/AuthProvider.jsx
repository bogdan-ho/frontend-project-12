import React, {
  useMemo, useState, createContext, useContext,
} from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedInfo, setLoggedInfo] = useState(localStorage.getItem('user'));

  const logIn = () => setLoggedInfo(localStorage.getItem('user'));
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedInfo(null);
  };

  const authState = useMemo(() => ({ loggedInfo, logIn, logOut }), [loggedInfo]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
