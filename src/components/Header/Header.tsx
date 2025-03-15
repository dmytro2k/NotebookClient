import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './styles.module.scss';

type HeaderProps = ComponentPropsWithoutRef<'div'>;

const Header: FC<HeaderProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.heading} ${className}`}>
      {children}
    </div>
  );
};

export default Header;
