// import { createContext, useState, useEffect, ReactNode } from 'react';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User as UserApp, signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebase-config';

// interface User {
//   signUp: (email: string, password: string) => void,
//   signIn: (email: string, password: string) => void,
//   user: UserApp | null,
//   signOutApp: () => void
// }

// const defaultState = {
//   signUp: () => {},
//   signIn: () => {},
//   user: null,
//   signOutApp: () => {},
// }

// export const UserContext = createContext<User>(defaultState);

// export const UserContextProvider = ({ children }: {children: ReactNode}) => {

//   const [user, setUser] = useState<UserApp | null>(null);
//   const [loadingData, setLoadingData] = useState(true);

//   const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

//   const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

//   const signOutApp = () => signOut(auth);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setUser(user);
//       setLoadingData(false);
//     });

//     return unsubscribe;
//   }, []);
  
//   return (
//     <UserContext.Provider value={{ 
//       signUp,
//       signIn,
//       user,
//       signOutApp
//     }}>
//       {!loadingData && children}
//     </UserContext.Provider>
//   )
// }