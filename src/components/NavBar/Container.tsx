import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

const Container: FC<ContainerProps> = ({ className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
