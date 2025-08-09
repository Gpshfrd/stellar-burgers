import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { clearErrors, errorSelector } from '../../services/slices/user/slice';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../services/slices/user/actions';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorSelector);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(result)) {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <LoginUI
      errorText={error!}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
