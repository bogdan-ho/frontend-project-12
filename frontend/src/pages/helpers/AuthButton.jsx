import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();

  return (
    localStorage.getItem('user')
      ? <Button onClick={auth.logOut} as={Link} to="/login">{t('authButton.logOut')}</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>{t('authButton.logIn')}</Button>
  );
};

export default AuthButton;
