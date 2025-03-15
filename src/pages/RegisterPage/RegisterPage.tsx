import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Header from '../../components/Header/Header';
import Form from './Form';
import Footer from '../../components/Footer/Footer';

type RegisterPageComponentProps = ComponentPropsWithoutRef<'div'>;

const RegisterPageComponent: FC<RegisterPageComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.register} ${className}`}>
      {children}
    </div>
  );
};

const RegisterPage = Object.assign(RegisterPageComponent, {
  Header,
  Footer,
  Form,
});

export default RegisterPage;
