import Book from './components/Book/Book'
import styles from './app.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from './hooks/useAuth'
import { useState } from 'react'

function App() {
  const queryClient = useQueryClient()
  const [login, logout, user, token, isAuthorized] = useAuth()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    login({ userName: name, userPassword: password })
    setName('')
    setPassword('')
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <main>
      <Book>
        <Book.RightPage>
          <Book.RightPage.Container>
            <Book.RightPage.Heading>About</Book.RightPage.Heading>
          </Book.RightPage.Container>
        </Book.RightPage>
        <Book.LeftPage>
          <Book.LeftPage.Front>
            {!isAuthorized() ? (
              <Book.AuthForm>
                <Book.AuthForm.Label>
                  Log In
                  <Book.AuthForm.Input
                    value={name}
                    onChange={e => onNameChange(e)}
                    placeholder='Name'
                  />
                  <Book.AuthForm.Input
                    value={password}
                    type='password'
                    onChange={e => onPasswordChange(e)}
                    placeholder='Password'
                  />
                </Book.AuthForm.Label>
                <Book.AuthForm.Button onClick={e => handleLogin(e)}>Enter</Book.AuthForm.Button>
              </Book.AuthForm>
            ) : null}
          </Book.LeftPage.Front>
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
