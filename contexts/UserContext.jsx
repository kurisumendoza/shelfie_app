import { createContext, useState } from 'react';
import { ID } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      const response = await account.get();
      setUser(response);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function register(email, password) {
    try {
      await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
      });

      await login(email, password);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await account.deleteSession({ sessionId: 'current' });
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
