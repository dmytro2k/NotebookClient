import { ComponentPropsWithoutRef, FC, useState } from 'react'
import styles from './styles.module.scss'

type ButtonComponentProps = ComponentPropsWithoutRef<'button'>

const Button: FC<ButtonComponentProps> = ({ className = '', onClick, children, ...rest }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      className={`${styles.custom_button} ${isClicked ? styles.transparent : ''} ${className}`}
      onClick={e => handleClick(e)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
