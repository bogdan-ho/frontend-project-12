import { io } from 'socket.io-client';
import React, { useMemo } from 'react';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';
import { ChatApiContext } from './contexts/index';

const socket = io();

socket.on('connect', () => {
  console.log(socket.id);
  console.log(socket.connected); // true
});

// messages
const subscribeOnMessages = (dispatch) => {
  socket.on('newMessage', (payload) => {
    console.log('payload', payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(messagesActions.addMessage(payload));
  });
};
const unsubscribeMessages = () => {
  socket.off('newMessage');
  console.log('unsubscribe from messages');
};

const sendMessage = (body, currentChannelId, username) => {
  console.log('body', body);
  // console.log('actions', actions);
  socket.emit('newMessage', { body, channelId: currentChannelId, username });
};

// channels
const subscribeNewChannel = (dispatch) => {
  socket.on('newChannel', (payload) => {
    console.log('newChannel payload', payload); // { id: 6, name: "new channel", removable: true }
    dispatch(channelActions.addChannel(payload));
    dispatch(channelActions.setCurrentChannelId(payload.id));
  });
};

const unsubscribeNewChannel = () => {
  socket.off('newChannel');
  console.log('unsubscribe from newChannel');
};

const subscribeRemoveChannel = (dispatch) => {
  socket.on('removeChannel', (payload) => {
    console.log('removeChannel payload', payload); // { id: 6, name: "new channel", removable: true }
    dispatch(channelActions.removeChannel(payload.id));
  });
};

const unsubscribeRemoveChannel = () => {
  socket.off('removeChannel');
  console.log('unsubscribe from RemoveChannel');
};

const createNewChannel = (name) => {
  console.log('emitNewChannel name', name);
  socket.emit('newChannel', { name });
};

const removeChannel = (id) => {
  console.log('emitRemoveChannel id', id);
  socket.emit('removeChannel', { id });
};

const subscribeRenameChannel = (dispatch) => {
  socket.on('renameChannel', (payload) => {
    console.log('renameChannel payload', payload); // { id: 6, name: "new name channel", removable: true }
    dispatch(channelActions.updateChannel({ id: [payload.id], changes: payload }));
  });
};

const unsubscribeRenameChannel = () => {
  socket.off('renameChannel');
  console.log('unsubscribe from renameChannel');
};

const renameChannel = (id, name) => {
  console.log('renameChannel id name', id, name);
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
