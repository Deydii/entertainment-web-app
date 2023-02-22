import { createContext, useState, ReactNode } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

interface User {
  signUp: (email: string, password: string) => void,
  loading: boolean,
  errorSignUp: string,
}

const defaultState = {
  signUp: () => {},
  loading: false,
  errorSignUp: "",
}

export const UserContext = createContext<User>(defaultState);

export const UserContextProvider = ({ children }: {children: ReactNode}) => {

  const [loading, setLoading] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");

  const signUp = async (email: string, password: string) => {
    setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log("ok"))
      .catch(error => {
        const code = "auth/invalid-email" || error.code === "auth/email-already-exists"
        if (error.code === code) {
          const message:string = error.code.slice(5).replaceAll('-', ' ');
          const errorMessage = message.charAt(0).toUpperCase() + message.slice(1);
          setErrorSignUp(errorMessage);
        }
        if (error.code !== code) {
          setErrorSignUp("");
        }
      })
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ 
      signUp, 
      loading, 
      errorSignUp
    }}>
      {children}
    </UserContext.Provider>
  )
}