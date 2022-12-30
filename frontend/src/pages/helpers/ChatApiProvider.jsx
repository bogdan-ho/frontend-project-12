import React, {
  useMemo, createContext, useContext,
} from 'react';

const ChatApiContext = createContext({});

export const useChatApi = () => useContext(ChatApiContext);

const ChatApiProvider = ({ children, value }) => {
  const {
    createNewChannel, removeChannel, renameChannel, sendMessage,
  } = value;

  const chatApiFunctions = useMemo(() => ({
    createNewChannel, removeChannel, renameChannel, sendMessage,
  }), [createNewChannel, removeChannel, renameChannel, sendMessage]);

  return (
    <ChatApiContext.Provider value={chatApiFunctions}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
