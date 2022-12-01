import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Link,
} from 'react-router-dom';
import {
  Navbar, Container, Button,
} from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import '../assets/application.scss';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import { AuthContext } from '../contexts';
import { useAuth } from '../hooks';
import SocketProvider from '../api';
import routes from '../routes';

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

const App = () => {
  useEffect(() => {
    // register new user
    axios.post(routes.SignUpPath(), { username: 'user1user1', password: 'user1user1' }).then((response) => {
      console.log(response.data); // => { token: ..., username: 'newuser' }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('h-100');
    document.getElementById('root').classList.add('h-100');
    document.body.classList.add('h-100', 'bg-light');

    return () => {
      document.documentElement.classList.remove('h-100');
      document.getElementById('root').classList.remove('h-100');
      document.body.classList.remove('h-100', 'bg-light');
    };
  }, []);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <SocketProvider>
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
          </SocketProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
