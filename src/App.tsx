import Book from './components/Book/Book';
import styles from './app.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import { Routes, Route, Navigate } from 'react-router';
import AboutPage from './pages/AboutPage/AboutPage';
import ContentPage from './pages/ContentPage/ContentPage';
import NavBar from './components/NavBar/NavBar';
import AuthLayout from './components/AuthLayout/AuthLayout';
import Auth from './components/Auth/Auth';
import { AuthContext } from './contexts/AuthProvider';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const queryClient = useQueryClient();
  const { login, register, logout, user, token, isAuthorized } = useAuth();

  return (
    <main>
      <AuthContext.Provider value={{ login, register, logout, user, token, isAuthorized }}>
        <Book>
          <Book.RightPage>
            <Book.RightPage.Container className={styles.centerd}>
              <Routes>
                <Route path="/" element={<Navigate to="/about" replace />} />
                <Route path="/about" element={<AboutPage />} />
                <Route element={<AuthLayout />}>
                  <Route
                    path="/login"
                    element={
                      <>
                        <Auth.Header>Login</Auth.Header>
                        <Auth.LoginForm />
                      </>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <>
                        <Auth.Header>Register</Auth.Header>
                        <Auth.RegisterForm />
                      </>
                    }
                  />
                </Route>
                <Route path="/date" element={<ContentPage />} />
                <Route
                  path="/*"
                  element={
                    <NotFoundPage>
                      <NotFoundPage.Header>404 - Not Found</NotFoundPage.Header>
                      <NotFoundPage.Footer />
                    </NotFoundPage>
                  }
                />
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
                    {isAuthorized || (
                      <>
                        <NavBar.Item navigationString="/login">Login</NavBar.Item>
                        <NavBar.Item navigationString="/register">Register</NavBar.Item>
                      </>
                    )}
                    {isAuthorized && <NavBar.Item navigationString="/date">Date</NavBar.Item>}
                  </NavBar.Container>
                </NavBar>
              </Book.LeftPage.Container>
            </Book.LeftPage.Back>
          </Book.LeftPage>
        </Book>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
