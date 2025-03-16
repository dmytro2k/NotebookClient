import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Label from '../Label/Label';
import Input from '../Input/Input';
import { useForm } from '@tanstack/react-form';
import Button from '../Button/Button';
import { useAuthContext } from '../../contexts/AuthProvider';

type RegisterFormProps = ComponentPropsWithoutRef<'div'>;

const RegisterForm: FC<RegisterFormProps> = ({ className = '', children, ...rest }) => {
  const { register } = useAuthContext();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values.value);
      register({ userName: form.state.values.username, userPassword: form.state.values.password });
      form.reset();
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
        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ['password'],
            onChangeAsyncDebounceMs: 700,
            onChangeAsync: ({ value, fieldApi }) => {
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
              if (value !== fieldApi.form.getFieldValue('password')) {
                return 'Passwords do not match';
              }
            },
          }}
          children={(field) => (
            <div className={`${styles.field}`}>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
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
      <Button onClick={form.handleSubmit}>Register</Button>
      {children}
    </div>
  );
};

export default RegisterForm;
