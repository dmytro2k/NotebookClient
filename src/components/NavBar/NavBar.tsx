import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Container from './Container';
import Item from './Item';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type NavBarComponentProps = ComponentPropsWithoutRef<'div'>;

const NavBarComponent: FC<NavBarComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.navbar} ${className}`}>
      {children}
    </div>
  );
};

const NavBar = Object.assign(NavBarComponent, {
  Header,
  Footer,
  Container,
  Item,
});

export default NavBar;
