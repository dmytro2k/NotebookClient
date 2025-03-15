import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';

type LabelComponentProps = ComponentPropsWithoutRef<'label'>;

const Label: FC<LabelComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <label {...rest} className={`${styles.label} ${className}`}>
      {children}
    </label>
  );
};

export default Label;
