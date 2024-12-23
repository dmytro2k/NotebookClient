import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './styles.module.scss'

type PageContainerProps = ComponentPropsWithoutRef<'div'>

const PageContainer: FC<PageContainerProps> = ({ className = '', children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${styles.container} ${className}`}
    >
      {children}
    </div>
  )
}

export default PageContainer
