import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import ChatPage from './chatPage';
import LoginPage from './loginPage';
import SignUpPage from './signUpPage';
import NotFoundPage from './notFoundPage';
import SocketProvider from '../api';
import AuthProvider from './helpers/AuthProvider';
import PrivateRoute from './helpers/PrivateRoute';
import AuthButton from './helpers/AuthButton';
import RollbarProvider from './helpers/RollbarProvider';

const App = () => {
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
    <RollbarProvider>
      <SocketProvider>
        <AuthProvider>
          <div className="h-100">
            <div className="h-100" id="chat">
              <div className="d-flex flex-column h-100">
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
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </BrowserRouter>
              </div>
              <ToastContainer />
            </div>
          </div>
        </AuthProvider>
      </SocketProvider>
    </RollbarProvider>
  );
};

export default App;
