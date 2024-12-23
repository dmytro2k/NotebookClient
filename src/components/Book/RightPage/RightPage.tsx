import { ComponentPropsWithoutRef, FC } from 'react'
import styles from './styles.module.scss'
import PageHeading from '../PageHeading/PageHeading'
import PageContainer from '../PageContainer/PageContainer'

type RightPageComponentProps = ComponentPropsWithoutRef<'div'>

const RightPageComponent: FC<RightPageComponentProps> = ({ className = '', children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${styles.right_page} ${className}`}
    >
      {children}
    </div>
  )
}

const RightPage = Object.assign(RightPageComponent, {
  Container: PageContainer,
  Heading: PageHeading,
})

export default RightPage
