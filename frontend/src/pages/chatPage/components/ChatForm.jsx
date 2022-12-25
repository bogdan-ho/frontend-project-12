import { Formik } from 'formik';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useChatApi } from '../../../hooks';
import { selectCurrentChannelId } from '../../../slices/channelsSlice';

const ChatForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const { username } = JSON.parse(localStorage.getItem('user'));
  const chatApi = useChatApi();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleFormSubmit = (value, actions) => {
    const filteredBody = leoProfanity.clean(value.body);
    chatApi.sendMessage(filteredBody, currentChannelId, username);
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
                placeholder={t('chatPage.form.enterMessage')}
                value={values.body}
                onChange={handleChange}
                ref={inputRef}
                className="border-0 p-0 ps-2"
                aria-label="Новое сообщение"
              />
              <Button variant="group-vertical" type="submit" disabled={values.body.trim().length === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                <span className="visually-hidden">{t('chatPage.form.button')}</span>
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default ChatForm;
