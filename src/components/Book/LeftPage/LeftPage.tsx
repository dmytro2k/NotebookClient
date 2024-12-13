import { ComponentPropsWithoutRef, FC } from 'react'
import styles from './styles.module.scss'
import { LeftPageContext } from './LeftPageProvider'
import LeftPageFront from './LeftPageFront'
import LeftPageBack from './LeftPageBack'
import { useBookContext } from '../BookProvider'

type LeftPageComponentProps = ComponentPropsWithoutRef<'div'>

const LeftPageComponent: FC<LeftPageComponentProps> = ({ className = '', children, ...rest }) => {
  const { isBookOpen, onBookClick } = useBookContext()
  return (
    <LeftPageContext.Provider value={{ onBookClick, isBookOpen }}>
      <div
        onClick={onBookClick}
        {...rest}
        className={`${styles.left_page} ${isBookOpen ? styles.open : ''} ${className}`}
      >
        {children}
      </div>
    </LeftPageContext.Provider>
  )
}

const LeftPage = Object.assign(LeftPageComponent, {
  Front: LeftPageFront,
  Back: LeftPageBack,
})

export default LeftPage
