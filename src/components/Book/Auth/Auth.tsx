import { ComponentPropsWithoutRef, FC, useState } from 'react'
import styles from './styles.module.scss'
import Button from '../../Button/Button'

type loginProps = {
  userName: string
  userPassword: string
}

type AuthComponentProps = ComponentPropsWithoutRef<'form'> & {
  login: ({ userName, userPassword }: loginProps) => void
}

const Auth: FC<AuthComponentProps> = ({ login, className = '', children, ...rest }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    login({ userName: name, userPassword: password })
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <form
      className={`${styles.wrapper} ${className}`}
      {...rest}
      onClick={e => e.stopPropagation()}
    >
      <label>
        Log In
        <input
          value={name}
          onChange={e => onNameChange(e)}
          placeholder='Name'
        />
        <input
          value={password}
          type='password'
          onChange={e => onPasswordChange(e)}
          placeholder='Password'
        />
      </label>
      <Button onClick={e => handleSubmit(e)}>Enter</Button>
    </form>
  )
}

export default Auth
