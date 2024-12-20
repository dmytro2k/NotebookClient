import { createContext, useContext } from 'react'

type RightPageContextProps = {}

export const RightPageContext = createContext<RightPageContextProps>(null!)

export const useRightPageContext = () => {
  const props = useContext(RightPageContext)
  if (!props) {
    throw new Error('No right page context found')
  }

  return props
}
