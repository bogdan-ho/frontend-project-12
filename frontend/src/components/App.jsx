import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { useMemo, useState } from 'react';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import '../assets/application.scss';
import AuthContext from '../contexts';
// import useAuth from '../hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log(`localStorage.getItem('user') is ${JSON.stringify(localStorage.getItem('user'))}`);
  return (
    localStorage.getItem('user') ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

// const AuthButton = () => {
//   const auth = useAuth();
//   const location = useLocation();

//   return (
//     auth.loggedIn
//       ? <Button onClick={auth.logOut}>Log out</Button>
//       : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
//   );
// };

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar className="shadow-sm bg-white">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
        )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
