import { createContext, useContext } from 'react';

type BookContextProps = {
  isBookOpen: boolean;
  onBookClick: () => void;
};

export const BookContext = createContext<BookContextProps>(null!);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('No book context found');
  }

  return context;
};
