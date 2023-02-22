import { createContext, useState, useEffect, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User as UserApp } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

interface User {
  signUp: (email: string, password: string) => void,
  signIn: (email: string, password: string) => void,
  user: UserApp | null
}

const defaultState = {
  signUp: () => {},
  signIn: () => {},
  user: null
}

export const UserContext = createContext<User>(defaultState);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

  const [user, setUser] = useState<UserApp | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  
      setLoadingData(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      signUp,
      signIn,
      user
    }}>
      {!loadingData && children}
    </UserContext.Provider>
  )
}