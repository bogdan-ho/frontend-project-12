import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSocket } from '../hooks';

// сделать фокус на инпуте при переключении каналов
const ChatForm = () => {
  const inputRef = useRef();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('user'));
  const socket = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // const sendMessage = (value, actions) => {
  //   console.log('value', value);
  //   // console.log('actions', actions);
  //   socket.emit('newMessage', { body: [value.body], channelId: currentChannelId, username });
  //   actions.resetForm();
  // };

  const handleFormSubmit = (value, actions) => {
    // console.log('value', value);
    socket.sendMessage(value, currentChannelId, username);
    actions.resetForm();
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
        }) => (
          <Form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="body"
                placeholder="Введите сообщение..."
                value={values.body}
                onChange={handleChange}
                ref={inputRef}
                className="border-0 p-0 ps-2"
              />
              <Button variant="group-vertical" type="submit" disabled={values.body.length === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default ChatForm;
