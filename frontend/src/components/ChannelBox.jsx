import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice';

const ChannelBox = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // console.log('channels is', channels);
  // console.log('currentChannelId is', currentChannelId);
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item w-100">
          {!removable
            ? (
              <button type="button" className="w-100 rounded-0 text-start btn">
                <span className="me-1">#</span>
                {name}
              </button>
            )
            : (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button variant={currentChannelId === id ? 'secondary' : 'light'} className="w-100 rounded-0 text-start text-truncate">
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle split id="dropdown-split-basic" variant={currentChannelId === id ? 'secondary' : 'light'}>
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Удалить</Dropdown.Item>
                  <Dropdown.Item href="#">Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

        </li>
      ))}
    </ul>
  );
};

export default ChannelBox;
