import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useSocket } from '../../hooks';
import { hideModal } from '../../slices/modalsSlice';
import { actions } from '../../slices/channelsSlice';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());
  const { channelId } = useSelector((state) => state.modalInfo.extra);
  const mainChannelId = 1;

  const socket = useSocket();
  const generateOnSubmit = (event) => {
    event.preventDefault();
    console.log('submit channelId', channelId);
    socket.emitRemoveChannel(channelId);
    handleClose();
    dispatch(actions.setCurrentChannelId(mainChannelId));
    toast.success('Канал удален');
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <form onSubmit={generateOnSubmit}>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="danger" type="submit">
              Удалить
            </Button>
          </Form.Group>
        </form>

      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
