import { useEffect } from 'react';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../hooks';
import { actions, selectors } from '../slices/channelsSlice';
import { setActiveModal } from '../slices/modalsSlice';

const ChannelBox = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // console.log('channels is', channels);
  // console.log('currentChannelId is', currentChannelId);
  const dispatch = useDispatch();
  const setActiveChannel = (id) => dispatch(actions.setCurrentChannelId(id));
  const socket = useSocket();

  useEffect(() => {
    socket.subscribeNewChannel(dispatch);
    socket.subscribeRemoveChannel(dispatch);
    socket.subscribeRenameChannel(dispatch);

    return () => {
      socket.unsubscribeNewChannel();
      socket.unsubscribeRemoveChannel();
      socket.unsubscribeRenameChannel();
    };
  }, []);
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item w-100">
          {!removable
            ? (
              <Button variant={currentChannelId === id ? 'secondary' : 'light'} className="w-100 rounded-0 text-start text-truncate" onClick={() => setActiveChannel(id)}>
                <span className="me-1">#</span>
                {name}
              </Button>
            )
            : (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button variant={currentChannelId === id ? 'secondary' : 'light'} className="w-100 rounded-0 text-start text-truncate" onClick={() => setActiveChannel(id)}>
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle split id="dropdown-split-basic" variant={currentChannelId === id ? 'secondary' : 'light'}>
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => dispatch(setActiveModal({ modalType: 'removeChannel', extra: { channelId: id } }))}>Удалить</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => dispatch(setActiveModal({ modalType: 'renameChannel', extra: { channelId: id } }))}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

        </li>
      ))}
    </ul>
  );
};

export default ChannelBox;
