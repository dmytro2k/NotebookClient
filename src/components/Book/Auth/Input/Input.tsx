import { ComponentPropsWithoutRef, FC } from 'react'
import './styles.module.scss'

type InputComponentProps = ComponentPropsWithoutRef<'input'>

const Input: FC<InputComponentProps> = ({ className = '', children, ...rest }) => {
  return <input {...rest} />
}

export default Input
