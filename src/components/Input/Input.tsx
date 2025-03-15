import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';

type InputComponentProps = ComponentPropsWithoutRef<'input'>;

const Input: FC<InputComponentProps> = ({ className = '', children, ...rest }) => {
  return <input {...rest} className={`${styles.input} ${className}`} />;
};

export default Input;
