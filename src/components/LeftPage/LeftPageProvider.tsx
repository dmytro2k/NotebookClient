import { createContext, useContext } from 'react'

type LeftPageContextProps = {
  onBookClick: () => void
  isBookOpen: boolean
}

export const LeftPageContext = createContext<LeftPageContextProps>(null!)

export const useLeftPageContext = () => {
  const props = useContext(LeftPageContext)
  if (!props) {
    throw new Error('No left page context found')
  }

  return props
}
