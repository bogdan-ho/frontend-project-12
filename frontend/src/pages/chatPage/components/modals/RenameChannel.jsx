import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useChatApi } from '../../../../hooks';
import { hideModal } from '../../../../slices/modalsSlice';
import { channelsSelectors, selectModalInfoExtra } from '../../../../slices/selectors';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  const { channelId } = useSelector(selectModalInfoExtra);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelName = channels.find((channel) => channel.id === channelId).name;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const chatApi = useChatApi();
  const generateOnSubmit = (values) => {
    const filteredName = leoProfanity.clean(values.body);
    chatApi.renameChannel(channelId, filteredName);
    handleClose();
    toast.success(t('toasts.rename'));
  };

  const channelsNames = channels.map((ch) => ch.name);
  const schema = yup.object().shape({
    body: yup.string().required(t('errors.requiredField')).min(3, t('errors.minMaxLength')).max(20, t('errors.minMaxLength'))
      .notOneOf(channelsNames, t('errors.notUnique')),
  });

  const formik = useFormik({
    onSubmit: generateOnSubmit,
    validationSchema: schema,
    initialValues: { body: channelName },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label className="visually-hidden">{t('modals.rename.label')}</Form.Label>
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
            <Form.Control.Feedback type="invalid">{formik.errors.body}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                {t('modals.rename.closeButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('modals.rename.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
