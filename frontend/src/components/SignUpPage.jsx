import React from 'react';
import {
  Container, Col, Row, Card,
} from 'react-bootstrap';
import SignUpForm from './SignUpForm';

import avatar from '../assets/avatar_1.jpg';

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={avatar} className="rounded-circle" alt="register" />
            </div>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;
