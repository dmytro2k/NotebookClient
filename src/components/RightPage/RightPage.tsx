import { ComponentPropsWithoutRef, FC } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { RightPageContext } from './RightPageProvider'
import RightPageContainer from './RightPageContainer'

type RightPageComponentProps = ComponentPropsWithoutRef<'div'> & {}

const RightPageComponent: FC<RightPageComponentProps> = ({ className, children, ...rest }) => {
  return (
    <RightPageContext.Provider value={{}}>
      <div
        {...rest}
        className={`${classNames('relative', className)} ${styles.right_page}`}
      >
        {children}
      </div>
    </RightPageContext.Provider>
  )
}

const RightPage = Object.assign(RightPageComponent, {
  Container: RightPageContainer,
})

export default RightPage
