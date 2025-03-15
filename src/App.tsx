import Book from './components/Book/Book';
import styles from './app.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import { Routes, Route, Navigate } from 'react-router';
import AboutPage from './pages/AboutPage/AboutPage';
import ContentPage from './pages/ContentPage/ContentPage';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  const queryClient = useQueryClient();
  const { isAuthorized } = useAuth();

  return (
    <main>
      <Book>
        <Book.RightPage>
          <Book.RightPage.Container className={styles.centerd}>
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/login"
                element={
                  <LoginPage>
                    <LoginPage.Header>Login</LoginPage.Header>
                    <LoginPage.Form />
                    <LoginPage.Footer />
                  </LoginPage>
                }
              />
              <Route
                path="/register"
                element={
                  <RegisterPage>
                    <RegisterPage.Header>Register</RegisterPage.Header>
                    <RegisterPage.Form />
                    <RegisterPage.Footer />
                  </RegisterPage>
                }
              />
              <Route path="/date" element={<ContentPage />} />
            </Routes>
          </Book.RightPage.Container>
        </Book.RightPage>
        <Book.LeftPage>
          <Book.LeftPage.Front />
          <Book.LeftPage.Back>
            <Book.LeftPage.Container onClick={(e) => e.stopPropagation()}>
              <NavBar>
                <NavBar.Header>Contents:</NavBar.Header>
                <NavBar.Container>
                  <NavBar.Item navigationString="/about">About</NavBar.Item>
                  {!isAuthorized || (
                    <>
                      <NavBar.Item navigationString="/login">Login</NavBar.Item>
                      <NavBar.Item navigationString="/register">Register</NavBar.Item>
                    </>
                  )}
                  {!isAuthorized && <NavBar.Item navigationString="/date">Date</NavBar.Item>}
                </NavBar.Container>
              </NavBar>
            </Book.LeftPage.Container>
          </Book.LeftPage.Back>
        </Book.LeftPage>
      </Book>
    </main>
  );
}

export default App;
