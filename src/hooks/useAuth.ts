import { useMutation } from '@tanstack/react-query';
import axiosInstance, { axiosRequest } from '../api/axios';
import { useSessionStorage } from './useStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type User = {
  userId: string;
  userName: string;
};

type AuthData = {
  userName: string;
  userPassword: string;
};

type ResponseData = User & {
  token: string;
};

type UseAuthReturnType = {
  login: ({ userName, userPassword }: AuthData) => void;
  register: ({ userName, userPassword }: AuthData) => void;
  logout: () => void;
  user: User | undefined;
  token: String | undefined;
  isAuthorized: boolean;
};

export const useAuth = (): UseAuthReturnType => {
  const [user, setUser, removeUser] = useSessionStorage<User>('user', { userId: '', userName: '' });
  const [token, setToken, removeToken] = useSessionStorage<String>('token', '');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    if (!user || !token || user.userId === '' || user.userName === '' || token === '') {
      return setIsAuthorized(false);
    }

    navigate('/');
    return setIsAuthorized(true);
  }, [user, token]);

  const { mutate: mutateLogin } = useMutation({
    mutationFn: ({ userName, userPassword }: AuthData) => loginRequest({ userName, userPassword }),
    onSuccess: (data) => {
      setUser({ userId: data.userId, userName: data.userName });
      setToken(data.token);
    },
    throwOnError: false,
  });

  const { mutate: mutateRegister } = useMutation({
    mutationFn: ({ userName, userPassword }: AuthData) => registerRequest({ userName, userPassword }),
    onSuccess: (data) => {
      setUser({ userId: data.userId, userName: data.userName });
      setToken(data.token);
    },
    throwOnError: false,
  });

  const logout = () => {
    removeUser();
    removeToken();
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const login = ({ userName, userPassword }: AuthData) => {
    mutateLogin({ userName, userPassword });
  };

  const register = ({ userName, userPassword }: AuthData) => {
    mutateRegister({ userName, userPassword });
  };

  return { login, register, logout, user, token, isAuthorized };
};

const loginRequest = async ({ userName, userPassword }: AuthData) => {
  const response = await axiosRequest<ResponseData>({
    method: 'post',
    url: `/auth/login`,
    data: { userName, userPassword },
  });

  return response;
};

const registerRequest = async ({ userName, userPassword }: AuthData) => {
  const response = await axiosRequest<ResponseData>({
    method: 'post',
    url: `/auth/register`,
    data: { userName, userPassword },
  });

  return response;
};
