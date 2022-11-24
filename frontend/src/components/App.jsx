import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import {
  Navbar, Container, Link, Button,
} from 'react-bootstrap';
import { useMemo, useState } from 'react';

import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import '../assets/application.scss';
import AuthContext from '../contexts';
import useAuth from '../hooks';

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

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    localStorage.getItem('user')
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Войти</Button>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar className="shadow-sm bg-white">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
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
