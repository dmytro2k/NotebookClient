import Book from './components/Book/Book'
import styles from './app.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from './hooks/useAuth'

function App() {
  const queryClient = useQueryClient()
  const [login, logout, user, token, isAuthorized] = useAuth()

  return (
    <main>
      <Book>
        <Book.RightPage>
          <Book.RightPage.Container>
            <Book.RightPage.Heading>About</Book.RightPage.Heading>
          </Book.RightPage.Container>
        </Book.RightPage>
        <Book.LeftPage>
          <Book.LeftPage.Front>{!isAuthorized() ? <Book.Auth login={login}></Book.Auth> : null}</Book.LeftPage.Front>
          <Book.LeftPage.Back>
            <Book.LeftPage.Container onClick={e => e.stopPropagation()}>
              <Book.LeftPage.Heading className={styles.centerd}>Contents:</Book.LeftPage.Heading>
            </Book.LeftPage.Container>
          </Book.LeftPage.Back>
        </Book.LeftPage>
      </Book>
    </main>
  )
}

export default App
