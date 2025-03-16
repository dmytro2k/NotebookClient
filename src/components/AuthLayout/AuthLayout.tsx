import { FC } from 'react';
import Auth from '../Auth/Auth';
import { Outlet } from 'react-router';

type AuthLayoutProps = {};

const AuthLayout: FC<AuthLayoutProps> = ({}) => {
  return (
    <Auth>
      <Outlet />
      <Auth.Footer />
    </Auth>
  );
};

export default AuthLayout;
