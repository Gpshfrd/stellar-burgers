import { Navigate, useLocation } from 'react-router-dom';
import {
  isAuthCheckedSelector,
  loginUserRequestSelector
} from '../../services/slices/user/slice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnauth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnauth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const loginUserRequest = useSelector(loginUserRequestSelector);
  const location = useLocation();

  if (!isAuthChecked && loginUserRequest) {
    return <Preloader />;
  }

  if (!isAuthChecked && !onlyUnauth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuthChecked && onlyUnauth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }

  return children;
};
