import { ComponentPropsWithoutRef, FC } from 'react';
import styles from './styles.module.scss';
import Label from '../Label/Label';
import Input from '../Input/Input';
import { useForm } from '@tanstack/react-form';
import Button from '../Button/Button';
import { useAuthContext } from '../../contexts/AuthProvider';

type LoginFormProps = ComponentPropsWithoutRef<'div'>;

const LoginForm: FC<LoginFormProps> = ({ className = '', children, ...rest }) => {
  const { login } = useAuthContext();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values.value);
      login({ userName: form.state.values.username, userPassword: form.state.values.password });
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" onClick={form.handleSubmit} disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Login'}
          </Button>
        )}
      />
      {children}
    </div>
  );
};

export default LoginForm;
