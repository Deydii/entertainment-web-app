import { createContext, ReactNode } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

interface User {
  signUp: (email: string, password: string) => void
}

const defaultState = {
  signUp: () => {}
}

export const UserContext = createContext<User>(defaultState);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  return (
    <UserContext.Provider value={{ 
      signUp 
    }}>
      {children}
    </UserContext.Provider>
  )
}