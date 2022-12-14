import {
  FloatingLabel, Col, Form, Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../../../routes';
import { useAuth } from '../../helpers/AuthProvider';

const SignUpForm = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const auth = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup.string().required('errors.requiredField').min(3, 'errors.minMaxLength').max(20, 'errors.minMaxLength'),
    password: yup.string().required('errors.requiredField').min(6, 'errors.minPasswordLength'),
    confirmPassword: yup.string().required('errors.requiredField').oneOf([yup.ref('password')], 'errors.passwordsMustMatch'),
  });

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
          window.localStorage.setItem('user', JSON.stringify(res.data));
          navigate(location.state ? location.state.from.pathname : '/');
          auth.logIn();
        } catch (err) {
          if (err.isAxiosError && err.response.status === 409) {
            inputRef.current.select();
            formikBag.setErrors({
              username: true,
              password: true,
              confirmPassword: t('errors.personAlreadyExists'),
            });
            return;
          }
          toast.error(t('errors.networkError'));
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
            {t('signUpForm.title')}
          </h1>
          <Form.Group as={Col}>
            <FloatingLabel
              controlId="floatingUsername"
              label={t('signUpForm.labels.username')}
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
                {t(errors.username)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel
              className="mb-3"
              controlId="floatingPassword"
              label={t('signUpForm.labels.password')}
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
                {t(errors.password)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel
              className="mb-4"
              controlId="floatingConfirmPassword"
              label={t('signUpForm.labels.confirmPassword')}
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
                {t(errors.confirmPassword)}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="w-100" variant="outline-primary" type="submit">
            {t('signUpForm.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
