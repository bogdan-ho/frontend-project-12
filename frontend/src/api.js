import { io } from 'socket.io-client';
import { useMemo } from 'react';
// import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import { SocketContext } from './contexts/index';

/*
у store есть метод dispatch, он поможет вынести логику
По сути, ты всю работу с сокетами делаешь за реактом, а через провайдет прокидываешь
функции-абстракции, провайдер нужен как мост для их передачи

Лучше сделать отдельный провайдер для работы с сокетом,
в котором будет сам сокет и функции-абстракции для emit

Инициализировать сам сокет и передать в провайдер это норм
*/
const socket = io();
// const dispatch = useDispatch();
// использовать диспатч здесь и установить соединение на новые сообщения здесь,
// иначе постоянно в реакт компоненте постоянно создаются новые соедининея на каждый рендеринг

socket.on('connect', () => {
  console.log(socket.id);
  console.log(socket.connected); // true
});

const subscribeOnMessages = (dispatch) => {
  socket.on('newMessage', (payload) => {
    console.log('payload', payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(messagesActions.addMessage(payload));
  });
};
const unsubscribeFromMessages = () => {
  socket.off('newMessage');
  console.log('unsubscribe from messages');
};

const sendMessage = (value, currentChannelId, username) => {
  console.log('value', value);
  // console.log('actions', actions);
  socket.emit('newMessage', { body: [value.body], channelId: currentChannelId, username });
};

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={useMemo(() => ({
    subscribeOnMessages,
    unsubscribeFromMessages,
    sendMessage,
  }), [])}
  >
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
