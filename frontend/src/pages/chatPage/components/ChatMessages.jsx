/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

import { useChatApi } from '../../../hooks';
import { getCurrentChannelMessages } from '../../../slices/messagesSlice';

const ChatMessages = () => {
  const currentChannelMessages = useSelector(getCurrentChannelMessages);

  const chatApi = useChatApi();
  const dispatch = useDispatch();

  useEffect(() => {
    chatApi.subscribeOnMessages(dispatch);

    return () => {
      chatApi.unsubscribeMessages();
    };
  }, []);

  useEffect(() => {
    scroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [currentChannelMessages.length]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 h-100">
      {currentChannelMessages.length > 0
        ? currentChannelMessages.map((message) => (
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
