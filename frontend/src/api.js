import { io } from 'socket.io-client';
import React, { useMemo } from 'react';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';
import { ChatApiContext } from './contexts/index';

const socket = io();

// messages
const subscribeOnMessages = (dispatch) => {
  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });
};
const unsubscribeMessages = () => {
  socket.off('newMessage');
};

const sendMessage = (body, currentChannelId, username) => {
  socket.emit('newMessage', { body, channelId: currentChannelId, username });
};

// channels
const subscribeNewChannel = (dispatch) => {
  socket.on('newChannel', (payload) => {
    dispatch(channelActions.addChannel(payload));
    dispatch(channelActions.setCurrentChannelId(payload.id));
  });
};

const unsubscribeNewChannel = () => {
  socket.off('newChannel');
};

const subscribeRemoveChannel = (dispatch) => {
  socket.on('removeChannel', (payload) => {
    dispatch(channelActions.removeChannel(payload.id));
  });
};

const unsubscribeRemoveChannel = () => {
  socket.off('removeChannel');
};

const createNewChannel = (name) => {
  socket.emit('newChannel', { name });
};

const removeChannel = (id) => {
  socket.emit('removeChannel', { id });
};

const subscribeRenameChannel = (dispatch) => {
  socket.on('renameChannel', (payload) => {
    dispatch(channelActions.updateChannel({ id: [payload.id], changes: payload }));
  });
};

const unsubscribeRenameChannel = () => {
  socket.off('renameChannel');
};

const renameChannel = (id, name) => {
  socket.emit('renameChannel', { id, name });
};

const ChatApiProvider = ({ children }) => (
  <ChatApiContext.Provider value={useMemo(() => ({
    subscribeOnMessages,
    unsubscribeMessages,
    sendMessage,
    subscribeNewChannel,
    unsubscribeNewChannel,
    subscribeRemoveChannel,
    unsubscribeRemoveChannel,
    createNewChannel,
    removeChannel,
    subscribeRenameChannel,
    unsubscribeRenameChannel,
    renameChannel,
  }), [])}
  >
    {children}
  </ChatApiContext.Provider>
);

export default ChatApiProvider;
