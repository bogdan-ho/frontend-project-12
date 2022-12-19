/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useChatApi } from '../../../hooks';
import { messagesSelectors, selectCurrentChannelId } from '../../../slices/selectors';

const ChatMessages = () => {
  const currentChannelId = useSelector(selectCurrentChannelId);
  const allMessages = useSelector(messagesSelectors.selectAll);

  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  const chatApi = useChatApi();
  const dispatch = useDispatch();

  useEffect(() => {
    chatApi.subscribeOnMessages(dispatch);

    return () => {
      chatApi.unsubscribeMessages();
    };
  }, []);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.length > 0
        ? messages.map((message) => (
          <div key={`${message.body}${message.id}`} className="text-break mb-2">
            <b>{message.username}</b>
            {`: ${message.body}`}
          </div>
        ))
        : null}
    </div>
  );
};

export default ChatMessages;
