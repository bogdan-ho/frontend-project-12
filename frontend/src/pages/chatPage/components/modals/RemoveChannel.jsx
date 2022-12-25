import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useChatApi } from '../../../helpers/ChatApiProvider';
import { hideModal, selectModalInfoExtra } from '../../../../slices/modalsSlice';
import { actions, selectCurrentChannelId } from '../../../../slices/channelsSlice';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  const { channelId } = useSelector(selectModalInfoExtra);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const mainChannelId = 1;

  const chatApi = useChatApi();
  const generateOnSubmit = (event) => {
    event.preventDefault();
    chatApi.removeChannel(channelId);
    handleClose();
    toast.success(t('toasts.remove'));

    if (currentChannelId === channelId) {
      dispatch(actions.setCurrentChannelId(mainChannelId));
    }
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove.text')}</p>
        <form onSubmit={generateOnSubmit}>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('modals.remove.closeButton')}
            </Button>
            <Button variant="danger" type="submit">
              {t('modals.remove.submitButton')}
            </Button>
          </Form.Group>
        </form>

      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
