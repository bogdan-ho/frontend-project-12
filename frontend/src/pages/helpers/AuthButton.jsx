import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} as={Link} to="/login">{t('authButton.logOut')}</Button>
      : null
  );
};

export default AuthButton;
