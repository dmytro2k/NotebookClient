import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type NotFoundPageComponentProps = ComponentPropsWithoutRef<'div'>;

const NotFoundPageComponent: FC<NotFoundPageComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.not_found} ${className}`}>
      {children}
    </div>
  );
};

const NotFoundPage = Object.assign(NotFoundPageComponent, {
  Header,
  Footer,
});

export default NotFoundPage;
