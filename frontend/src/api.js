import { io } from 'socket.io-client';
import { useMemo } from 'react';
// import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';
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

const sendMessage = (value, currentChannelId, username) => {
  console.log('value', value);
  // console.log('actions', actions);
  socket.emit('newMessage', { body: [value.body], channelId: currentChannelId, username });
};

// channels
const subscribeNewChannel = (dispatch) => {
  socket.on('newChannel', (payload) => {
    console.log('newChannel payload', payload); // { id: 6, name: "new channel", removable: true }
    dispatch(channelActions.addChannel(payload));
  });
};

const unsubscribeNewChannel = () => {
  socket.off('newChannel');
  console.log('unsubscribe from newChannel');
};

const subscribeRemoveChannel = (dispatch) => {
  socket.on('removeChannel', (payload) => {
    console.log('removeChannel payload', payload); // { id: 6, name: "new channel", removable: true }
    dispatch(channelActions.removeChannel(payload));
  });
};

const unsubscribeRemoveChannel = () => {
  socket.off('removeChannel');
  console.log('unsubscribe from RemoveChannel');
};

const emitNewChannel = (name) => {
  console.log('emitNewChannel name', name);
  socket.emit('newChannel', { name });
};

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={useMemo(() => ({
    subscribeOnMessages,
    unsubscribeMessages,
    sendMessage,
    subscribeNewChannel,
    unsubscribeNewChannel,
    subscribeRemoveChannel,
    unsubscribeRemoveChannel,
    emitNewChannel,
  }), [])}
  >
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
