import { io } from 'socket.io-client';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';

import store from './slices/index';

export const socket = io();

const buildChatAPI = (socketInstance) => {
  const subscribeOnMessages = () => {
    socketInstance.on('newMessage', (payload) => {
      store.dispatch(messagesActions.addMessage(payload));
    });
  };

  const sendMessage = (body, currentChannelId, username) => {
    socketInstance.emit('newMessage', { body, channelId: currentChannelId, username });
  };

  const subscribeNewChannel = () => {
    socketInstance.on('newChannel', (payload) => {
      store.dispatch(channelActions.addChannel(payload));
    });
  };

  const subscribeRemoveChannel = () => {
    socketInstance.on('removeChannel', (payload) => {
      store.dispatch(channelActions.removeChannel(payload.id));
    });
  };

  const createNewChannel = (name) => {
    socketInstance.emit('newChannel', { name }, (responseData) => {
      store.dispatch(channelActions.setCurrentChannelId(responseData.data.id));
    });
  };

  const removeChannel = (id) => {
    socketInstance.emit('removeChannel', { id });
  };

  const subscribeRenameChannel = () => {
    socketInstance.on('renameChannel', (payload) => {
      store.dispatch(channelActions.updateChannel({ id: [payload.id], changes: payload }));
    });
  };

  const renameChannel = (id, name) => {
    socketInstance.emit('renameChannel', { id, name });
  };

  return {
    subscribeOnMessages,
    sendMessage,
    subscribeNewChannel,
    subscribeRemoveChannel,
    createNewChannel,
    removeChannel,
    subscribeRenameChannel,
    renameChannel,
  };
};

export default buildChatAPI;
