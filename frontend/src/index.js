import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import init from './init.js';
import initLeoProfanity from './profanity.js';
import store from './slices/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
init();
initLeoProfanity();

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
