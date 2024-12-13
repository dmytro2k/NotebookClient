import { ComponentPropsWithoutRef, FC } from 'react'
import styles from './styles.module.scss'
import { LeftPageContext } from './LeftPageProvider'
import LeftPageFront from './LeftPageFront'
import LeftPageBack from './LeftPageBack'

type LeftPageComponentProps = ComponentPropsWithoutRef<'div'> & { onBookClick: () => void; isBookOpen: boolean }

const LeftPageComponent: FC<LeftPageComponentProps> = ({ className, onBookClick, isBookOpen, children, ...rest }) => {
  return (
    <LeftPageContext.Provider value={{ onBookClick, isBookOpen }}>
      <div
        onClick={onBookClick}
        {...rest}
        className={`${className} ${styles.left_page} ${isBookOpen ? styles.open : ''}`}
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
