import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router';

type ItemProps = ComponentPropsWithoutRef<'div'> & {
  navigationString: string;
};

const Item: FC<ItemProps> = ({ navigationString, className = '', children, ...rest }) => {
  return (
    <div {...rest} className={`${styles.item} ${className}`}>
      <NavLink to={navigationString}>{children}</NavLink>
    </div>
  );
};

export default Item;
