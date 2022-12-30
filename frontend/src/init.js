import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';

import App from './pages/App';
import resources from './locales/index.js';
import buildChatAPI from './api';
import ChatApiProvider from './pages/helpers/ChatApiProvider';
import store from './slices/index';
import initLeoProfanity from './profanity.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const socket = io();
  const {
    sendMessage,
    createNewChannel,
    removeChannel,
    renameChannel,
  } = buildChatAPI(socket);

  initLeoProfanity();

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ChatApiProvider value={{
          sendMessage, createNewChannel, removeChannel, renameChannel,
        }}
        >
          <App />
        </ChatApiProvider>
      </I18nextProvider>
    </Provider>

  );
};

export default init;
