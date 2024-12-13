import { ComponentPropsWithoutRef, FC, useState } from 'react'
import styles from './styles.module.scss'
import { BookContext } from './BookProvider'
import LeftPage from './LeftPage/LeftPage'
import RightPage from './RightPage/RightPage'

type BookComponentProps = ComponentPropsWithoutRef<'div'> & {}

const BookComponent: FC<BookComponentProps> = ({ className = '', children, ...rest }) => {
  const [isBookOpen, setIsBookOpen] = useState(true)

  const onBookClick = () => {
    setIsBookOpen(prev => !prev)
  }

  return (
    <BookContext.Provider value={{ isBookOpen, setIsBookOpen, onBookClick }}>
      <div
        {...rest}
        className={`${styles.book} ${className}`}
      >
        <div className={`${styles.accordion} ${!isBookOpen ? styles.open : ''}`}>{children}</div>
      </div>
    </BookContext.Provider>
  )
}

const Book = Object.assign(BookComponent, {
  LeftPage,
  RightPage,
})

export default Book