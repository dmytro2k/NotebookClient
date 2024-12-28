import { ComponentPropsWithoutRef, FC } from 'react'
import './styles.module.scss'

type LabelComponentProps = ComponentPropsWithoutRef<'label'>

const Label: FC<LabelComponentProps> = ({ className = '', children, ...rest }) => {
  return <label {...rest}>{children}</label>
}

export default Label
