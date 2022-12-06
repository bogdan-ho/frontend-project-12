import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelector } from '../slices/messagesSlice';
import { selectors as channelsSelector } from '../slices/channelsSlice';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';

const MessageBox = () => {
  const { t } = useTranslation();
  const allMessages = useSelector(messagesSelector.selectAll);
  const channels = useSelector(channelsSelector.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
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
