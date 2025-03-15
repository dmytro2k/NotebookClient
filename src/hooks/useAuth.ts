import { useMutation } from '@tanstack/react-query';
import { axiosRequest } from '../api/axios';
import { useSessionStorage } from './useStorage';

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

export const useAuth = (): {
  login: ({ userName, userPassword }: AuthData) => void;
  register: ({ userName, userPassword }: AuthData) => void;
  logout: () => void;
  user: User | undefined;
  token: String | undefined;
  isAuthorized: () => boolean;
} => {
  const [user, setUser, removeUser] = useSessionStorage<User>('user', { userId: '', userName: '' });
  const [token, setToken, removeToken] = useSessionStorage<String>('token', '');

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
  };

  const login = ({ userName, userPassword }: AuthData) => {
    mutateLogin({ userName, userPassword });
  };

  const register = ({ userName, userPassword }: AuthData) => {
    mutateRegister({ userName, userPassword });
  };

  const isAuthorized = () => {
    if (!user || !token || (user.userId === '' && user.userName === '')) {
      return false;
    }

    return true;
  };

  return { login, register, logout, user, token, isAuthorized };
};

const loginRequest = async ({ userName, userPassword }: AuthData) => {
  const response = await axiosRequest<ResponseData>({
    method: 'post',
    url: `/login`,
    data: { userName, userPassword },
  });

  return response;
};

const registerRequest = async ({ userName, userPassword }: AuthData) => {
  const response = await axiosRequest<ResponseData>({
    method: 'post',
    url: `/register`,
    data: { userName, userPassword },
  });

  return response;
};
