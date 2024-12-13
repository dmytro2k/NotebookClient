import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './styles.module.scss'

type LeftPageBackProps = ComponentPropsWithoutRef<'div'>

const LeftPageBack: FC<LeftPageBackProps> = ({ className = '', children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${styles.back} ${className}`}
    >
      {children}
    </div>
  )
}

export default LeftPageBack
