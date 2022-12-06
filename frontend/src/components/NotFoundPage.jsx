import { useTranslation } from 'react-i18next';
import image from '../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={image} />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        <a href="/">{t('notFoundPage.link')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
