import { createContext, useContext } from 'react';
import { AuthData, User } from '../hooks/useAuth';

type AuthContextProps = {
  login: ({ userName, userPassword }: AuthData) => void;
  register: ({ userName, userPassword }: AuthData) => void;
  logout: () => void;
  user: User | undefined;
  token: String | undefined;
  isAuthorized: boolean;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No auth context found');
  }

  return context;
};
