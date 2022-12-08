import React from 'react';
import {
  Container, Col, Row, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from '../assets/avatar.jpg';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt="login" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">{t('loginPage.dontHaveAccount')}</span>
                <Link to="/signup">{t('loginPage.signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
