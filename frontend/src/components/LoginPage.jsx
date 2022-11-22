import { useEffect } from 'react';
import {
  Container, Col, Row, Card,
} from 'react-bootstrap';

import avatar from '../assets/avatar.jpg';
import LoginForm from './LoginForm';

const LoginPage = () => {
  useEffect(() => {
    document.documentElement.classList.add('h-100');
    document.getElementById('root').classList.add('h-100');
    document.body.classList.add('h-100', 'bg-light');

    return () => {
      document.documentElement.classList.remove('h-100');
      document.getElementById('root').classList.remove('h-100');
      document.body.classList.remove('h-100', 'bg-light');
    };
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
              <Col className="col-12 col-md-8 col-xxl-6">
                <Card className="shadow-sm">
                  <Card.Body className="row p-5">
                    <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                      <img src={avatar} className="rounded-circle" alt="human on mountain" />
                    </Col>
                    <LoginForm />
                  </Card.Body>
                  <Card.Footer className="p-4">
                    <div className="text-center">
                      <span>Нет аккаунта?</span>
                      <a href="/signup">Регистрация</a>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
