import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './styles.module.scss';

type FooterProps = ComponentPropsWithoutRef<'div'>;

const Footer: FC<FooterProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.footer} ${className}`}>
      {children}
    </div>
  );
};

export default Footer;
