import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './styles.module.scss'

type LeftPageFrontProps = ComponentPropsWithoutRef<'div'>

const LeftPageFront: FC<LeftPageFrontProps> = ({ className, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${className} ${styles.front}`}
    >
      <div className={styles.bind}></div>
      {children}
    </div>
  )
}

export default LeftPageFront
