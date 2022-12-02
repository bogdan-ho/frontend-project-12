import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../hooks';
import { hideModal } from '../../slices/modalsSlice';

const AddChannel = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const socket = useSocket();
  const generateOnSubmit = (values) => {
    console.log('submit values', values);
    // add channel via socket api
    socket.emitNewChannel(values.body);
  };

  const formik = useFormik({ onSubmit: generateOnSubmit, initialValues: { body: '' } });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
            />
            <Form.Control.Feedback>Должно быть уникальным</Form.Control.Feedback>
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

export default AddChannel;
