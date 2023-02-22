import { createContext, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

interface User {
  signUp: (email: string, password: string) => void,
  signIn: (email: string, password: string) => void
}

const defaultState = {
  signUp: () => {},
  signIn: () => {}
}

export const UserContext = createContext<User>(defaultState);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  return (
    <UserContext.Provider value={{ 
      signUp,
      signIn
    }}>
      {children}
    </UserContext.Provider>
  )
}