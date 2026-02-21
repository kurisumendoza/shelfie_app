import { createContext, useEffect, useState } from 'react';
import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { tablesDB, client } from '../lib/appwrite';
import { useUser } from '../hooks/useUser';

const DATABASE_ID = '69995678003a0ec88eb4';
const TABLE_ID = 'books';

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [Query.equal('userId', user.$id)],
      });

      setBooks(response.rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await tablesDB.getRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function createBook(data) {
    try {
      const newBook = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: { ...data, userId: user.$id },
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteBook(id) {
    try {
      await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    let unsubscribe;

    if (!user) {
      setBooks([]);
      return;
    }

    fetchBooks();

    const channel = `databases.${DATABASE_ID}.tables.${TABLE_ID}.rows`;

    unsubscribe = client.subscribe(channel, (response) => {
      const row = response.payload;
      const event = response.events[0];

      if (event.includes('create')) {
        setBooks((prev) => [...prev, row]);
      }

      if (event.includes('delete')) {
        setBooks((prev) => prev.filter((book) => book.$id !== row.$id));
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
