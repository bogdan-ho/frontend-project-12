import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useSocket } from '../../hooks';
import { hideModal } from '../../slices/modalsSlice';
import { selectors } from '../../slices/channelsSlice';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());
  const { channelId } = useSelector((state) => state.modalInfo.extra);
  const channels = useSelector(selectors.selectAll);
  const channelName = channels.find((channel) => channel.id === channelId).name;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const socket = useSocket();
  const generateOnSubmit = (values) => {
    console.log('submit values', values);
    socket.emitRenameChannel(channelId, values.body);
    handleClose();
    toast.success('Канал переименован');
  };

  const channelsNames = channels.map((ch) => ch.name);
  const schema = yup.object().shape({
    body: yup.string().required().notOneOf(channelsNames),
  });

  const formik = useFormik({
    onSubmit: generateOnSubmit,
    validationSchema: schema,
    initialValues: { body: channelName },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="body" className="visually-hidden">Имя канала</Form.Label>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              name="body"
              className="mb-2"
              isInvalid={formik.errors.body}
            />
            <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                Отменить
              </Button>
              <Button variant="primary" type="submit">
                Отправить
              </Button>
            </div>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
