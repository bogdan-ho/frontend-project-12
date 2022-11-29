import {
  FloatingLabel, Col, Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const auth = useAuth();
  const location = useLocation();
  console.log(`location is ${JSON.stringify(location)}`);

  const navigate = useNavigate();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.loginPath(), values);
          console.log(`res is ${JSON.stringify(res)}`);
          window.localStorage.setItem('user', JSON.stringify(res.data));
          navigate(location.state ? location.state.from.pathname : '/');
          auth.logIn();
        } catch (err) {
          console.log(`err is ${JSON.stringify(err)}`);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
      }) => (
        <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">
            Войти
          </h1>
          <Form.Group as={Col}>
            <FloatingLabel
              controlId="floatingInput"
              label="Ваш ник"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="username"
                placeholder="name@example.com"
                value={values.username}
                onChange={handleChange}
                ref={inputRef}
                isInvalid={authFailed}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel
              className="mb-4"
              controlId="floatingPassword"
              label="Пароль"
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Неверные имя пользователя или пароль
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="w-100 mb-3" variant="outline-primary" type="submit">
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
