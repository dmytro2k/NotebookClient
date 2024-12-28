import { ComponentPropsWithoutRef, FC } from 'react'
import styles from './styles.module.scss'
import Button from './Button/Button'
import Input from './Input/Input'
import Label from './Label/Label'

type AuthFormComponentProps = ComponentPropsWithoutRef<'form'>

const AuthFormComponent: FC<AuthFormComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <form
      className={`${styles.wrapper} ${className}`}
      {...rest}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </form>
  )
}

const AuthForm = Object.assign(AuthFormComponent, {
  Button,
  Input,
  Label,
})

export default AuthForm
