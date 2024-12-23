import { ComponentPropsWithoutRef, FC } from 'react'
import styles from './styles.module.scss'
import LeftPageFront from './LeftPageFront'
import LeftPageBack from './LeftPageBack'
import { useBookContext } from '../BookProvider'
import PageContainer from '../PageContainer/PageContainer'
import PageHeading from '../PageHeading/PageHeading'

type LeftPageComponentProps = ComponentPropsWithoutRef<'div'>

const LeftPageComponent: FC<LeftPageComponentProps> = ({ className = '', children, ...rest }) => {
  const { isBookOpen, onBookClick } = useBookContext()
  return (
    <div
      onClick={onBookClick}
      {...rest}
      className={`${styles.left_page} ${isBookOpen ? styles.open : ''} ${className}`}
    >
      {children}
    </div>
  )
}

const LeftPage = Object.assign(LeftPageComponent, {
  Front: LeftPageFront,
  Back: LeftPageBack,
  Container: PageContainer,
  Heading: PageHeading,
})

export default LeftPage
