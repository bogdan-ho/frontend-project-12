import React, {
  useMemo, createContext, useContext,
} from 'react';
import buildChatAPI, { socket } from '../../api';

const ChatApiContext = createContext({});

export const useChatApi = () => useContext(ChatApiContext);
const {
  sendMessage,
  createNewChannel,
  removeChannel,
  renameChannel,
} = buildChatAPI(socket);

const ChatApiProvider = ({ children }) => (
  <ChatApiContext.Provider value={useMemo(() => ({
    createNewChannel, removeChannel, renameChannel, sendMessage,
  }), [])}
  >
    {children}
  </ChatApiContext.Provider>
);

export default ChatApiProvider;
