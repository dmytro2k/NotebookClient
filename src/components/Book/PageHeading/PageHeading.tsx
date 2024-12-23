import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './styles.module.scss'

type PageHeadingProps = ComponentPropsWithoutRef<'div'>

const PageHeading: FC<PageHeadingProps> = ({ className = '', children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${styles.heading} ${className}`}
    >
      {children}
    </div>
  )
}

export default PageHeading
