import { useState } from 'react'
import styles from './app.module.scss'
import RightPage from './components/RightPage/RightPage'
import LeftPage from './components/LeftPage/LeftPage'

function App() {
  const [isBookOpen, setIsBookOpen] = useState(true)

  const onBookClick = () => {
    setIsBookOpen(prev => !prev)
  }

  return (
    <main>
      <div className={styles.book}>
        <div className={`${styles.accordion} ${!isBookOpen ? styles.open : ''}`}>
          <RightPage className={styles.page}>
            <RightPage.Container />
          </RightPage>
          <LeftPage
            className={styles.page}
            onBookClick={onBookClick}
            isBookOpen={isBookOpen}
          >
            <LeftPage.Front />
            <LeftPage.Back />
          </LeftPage>
        </div>
      </div>
    </main>
  )
}

export default App
