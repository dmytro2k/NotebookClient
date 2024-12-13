import Book from './components/Book/Book'

function App() {
  return (
    <main>
      <Book>
        <Book.RightPage>
          <Book.RightPage.Container />
        </Book.RightPage>
        <Book.LeftPage>
          <Book.LeftPage.Front />
          <Book.LeftPage.Back />
        </Book.LeftPage>
      </Book>
    </main>
  )
}

export default App
