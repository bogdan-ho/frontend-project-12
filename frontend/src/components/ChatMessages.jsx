/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../hooks';
import { selectors } from '../slices/messagesSlice';

const ChatMessages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const allMessages = useSelector(selectors.selectAll);
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.subscribeOnMessages(dispatch);

    return () => {
      socket.unsubscribeMessages();
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
