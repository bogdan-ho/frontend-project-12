import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './pages/App';
import resources from './locales/index.js';
import buildChatAPI, { socket } from './api';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const {
    subscribeOnMessages,
    subscribeNewChannel,
    subscribeRemoveChannel,
    subscribeRenameChannel,
  } = buildChatAPI(socket);

  subscribeOnMessages();
  subscribeNewChannel();
  subscribeRemoveChannel();
  subscribeRenameChannel();

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default init;
