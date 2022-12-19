import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import { messagesSelectors, channelsSelectors, selectCurrentChannelId } from '../../../slices/selectors';

const MessageBox = () => {
  const { t } = useTranslation();

  const allMessages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentChannelName = channels
    .filter((ch) => ch.id === currentChannelId)
    .map((ch) => ch.name);
  const messages = allMessages.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelName}`}</b>
        </p>
        <span className="text-muted">{`${messages.length}${t('chatPage.messageBox.messages')}`}</span>
      </div>
      <ChatMessages />
      <ChatForm />
    </div>
  );
};

export default MessageBox;
