/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setActiveModal, selectModalInfo } from '../../slices/modalsSlice';
import { fetchData } from '../../slices/channelsSlice';
import ChannelBox from './components/ChannelBox';
import MessageBox from './components/MessageBox';
import getModal from './components/modals';

const renderModal = (modalInfo) => {
  if (!modalInfo.type) return null;

  const ModalComponent = getModal(modalInfo.type);

  return <ModalComponent />;
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalInfo = useSelector(selectModalInfo);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>{t('chatPage.channelBox.title')}</span>
              <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={() => dispatch(setActiveModal({ modalType: 'addChannel' }))}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <ChannelBox />
          </Col>
          <Col className="p-0 h-100">
            <MessageBox />
          </Col>
        </Row>
      </Container>
      {renderModal(modalInfo)}
    </>
  );
};

export default ChatPage;
