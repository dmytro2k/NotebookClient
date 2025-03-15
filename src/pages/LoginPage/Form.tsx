import { ComponentPropsWithoutRef, FC } from 'react';

import styles from './styles.module.scss';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import { useForm } from '@tanstack/react-form';
import Button from '../../components/Button/Button';
import { useAuth } from '../../hooks/useAuth';

type FormProps = ComponentPropsWithoutRef<'div'>;

const Form: FC<FormProps> = ({ className = '', children, ...rest }) => {
  const { login } = useAuth();
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      login({ userName: form.state.values.username, userPassword: form.state.values.password });
      console.log(values.value);
    },
  });

  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      <form
        className={`${styles.form}`}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="username"
          validators={{
            onChangeAsyncDebounceMs: 700,
            onChangeAsync: ({ value }) => {
              if (value.length < 3) {
                return 'Username must be at least 3 characters long';
              }
            },
          }}
          children={(field) => (
            <div className={`${styles.field}`}>
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.text}
              />
              {field.state.meta.errors && <div className={styles.error_messages}>{field.state.meta.errors}</div>}
            </div>
          )}
        />
        <form.Field
          name="password"
          validators={{
            onChangeAsyncDebounceMs: 700,
            onChangeAsync: ({ value }) => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters long';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[a-z]/.test(value)) {
                return 'Password must contain at least one lowercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
            },
          }}
          children={(field) => (
            <div className={`${styles.field}`}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.text}
              />
              {field.state.meta.errors && <div className={styles.error_messages}>{field.state.meta.errors}</div>}
            </div>
          )}
        />
      </form>
      <Button onClick={form.handleSubmit}>Login</Button>
      {children}
    </div>
  );
};

export default Form;
