import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  console.log(`localStorage.getItem('user') is ${JSON.stringify(localStorage.getItem('user'))}`);
  return (
    localStorage.getItem('user') ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
