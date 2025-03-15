import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Header from '../../components/Header/Header';
import Form from './Form';
import Footer from '../../components/Footer/Footer';

type LoginPageComponentProps = ComponentPropsWithoutRef<'div'>;

const LoginPageComponent: FC<LoginPageComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.login} ${className}`}>
      {children}
    </div>
  );
};

const LoginPage = Object.assign(LoginPageComponent, {
  Header,
  Footer,
  Form,
});

export default LoginPage;
