import { createContext, useState, useEffect, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as UserApp, signOut, onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import nookies from 'nookies';

interface User {
  signUp: (email: string, password: string) => void,
  signIn: (email: string, password: string) => void,
  user: UserApp | null,
  signOutApp: () => void
}

const defaultState = {
  signUp: () => {},
  signIn: () => {},
  user: null,
  signOutApp: () => {},
}

export const UserContext = createContext<User>(defaultState);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

  const [user, setUser] = useState<UserApp | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const signOutApp = () =>{ 
    signOut(auth);
    nookies.destroy(undefined, 'token');
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
        setLoadingData(false);
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { 
          path: '/',
          maxAge: 30 * 24 * 60 * 60 
        });
        setLoadingData(false);
      }
    });

    return unsubscribe;
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      signUp,
      signIn,
      user,
      signOutApp
    }}>
      {!loadingData && children}
    </UserContext.Provider>
  )
}