import React from 'react';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import ChatPage from './chatPage';
import LoginPage from './loginPage';
import SignUpPage from './signUpPage';
import NotFoundPage from './notFoundPage';
import AuthProvider from './helpers/AuthProvider';
import PrivateRoute from './helpers/PrivateRoute';
import AuthButton from './helpers/AuthButton';
import RollbarProvider from './helpers/RollbarProvider';
import PublicRoute from './helpers/PublicRoute';
import ChatApiProvider from './helpers/ChatApiProvider';

const App = () => (
  <RollbarProvider>
    <ChatApiProvider>
      <AuthProvider>
        <div className="h-100">
          <div className="h-100" id="chat">
            <div className="d-flex flex-column h-100">
              <BrowserRouter>
                <Navbar className="shadow-sm bg-white">
                  <Container>
                    <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
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
                  <Route
                    path="/login"
                    element={(
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    )}
                  />
                  <Route
                    path="/signup"
                    element={(
                      <PublicRoute>
                        <SignUpPage />
                      </PublicRoute>
                    )}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </div>
            <ToastContainer />
          </div>
        </div>
      </AuthProvider>
    </ChatApiProvider>
  </RollbarProvider>
);

export default App;
