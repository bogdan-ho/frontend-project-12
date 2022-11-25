import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const ChatMessages = () => {
  const messages = useSelector(selectors.selectAll);
  const userName = JSON.parse(localStorage.getItem('user')).username;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.length > 0
        ? messages.map((message) => (
          <div key={`${message.body}${message.id}`} className="text-break mb-2">
            <b>{userName}</b>
            {`: ${message.body}`}
          </div>
        ))
        : null}
    </div>
  );
};

export default ChatMessages;
