import { createContext, useContext } from 'react'

type BookContextProps = {
  isBookOpen: boolean
  setIsBookOpen: React.Dispatch<React.SetStateAction<boolean>>
  onBookClick: () => void
}

export const BookContext = createContext<BookContextProps>(null!)

export const useBookContext = () => {
  const props = useContext(BookContext)
  if (!props) {
    throw new Error('No book context found')
  }

  return props
}
