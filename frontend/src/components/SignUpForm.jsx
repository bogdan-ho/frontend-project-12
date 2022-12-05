import {
  FloatingLabel, Col, Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes';

const schema = yup.object().shape({
  username: yup.string().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
  password: yup.string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
  confirmPassword: yup.string().required('Обязательное поле').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUpForm = () => {
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
        confirmPassword: '',
      }}
      onSubmit={async ({ username, password }, formikBag) => {
        try {
          const res = await axios.post(routes.SignUpPath(), { username, password });
          console.log(`res is ${JSON.stringify(res)}`);
          window.localStorage.setItem('user', JSON.stringify(res.data));
          navigate(location.state ? location.state.from.pathname : '/');
          auth.logIn();
        } catch (err) {
          console.log(`err is ${JSON.stringify(err)}`);
          if (err.isAxiosError && err.response.status === 409) {
            inputRef.current.select();
            formikBag.setErrors({
              username: true,
              password: true,
              confirmPassword: 'Такой пользователь уже существует',
            });
            return;
          }
          throw err;
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form onSubmit={handleSubmit} className="w-50">
          <h1 className="text-center mb-4">
            Регистрация
          </h1>
          <Form.Group as={Col}>
            <FloatingLabel
              controlId="floatingInput"
              label="Имя пользователя"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="username"
                placeholder="name@example.com"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
                isInvalid={errors.username && touched.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel
              className="mb-3"
              controlId="floatingPassword"
              label="Пароль"
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel
              className="mb-4"
              controlId="floatingPassword"
              label="Подтвердите пароль"
            >
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.confirmPassword && touched.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="w-100" variant="outline-primary" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
