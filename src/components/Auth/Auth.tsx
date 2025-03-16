import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type AuthComponentProps = ComponentPropsWithoutRef<'div'>;

const AuthComponent: FC<AuthComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.auth} ${className}`}>
      {children}
    </div>
  );
};

const Auth = Object.assign(AuthComponent, {
  Header,
  Footer,
  LoginForm,
  RegisterForm,
});

export default Auth;
