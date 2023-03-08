import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { FirebaseError } from '@firebase/util';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

interface SignUpForm {
  password: string,
  repeatedPassword: string,
  passwords: string
}

const SignUp = () => {

  const { signUp } = useContext(UserContext);
  const router =  useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatedPassword: ""
  });

  const [errors, setErrors] = useState<SignUpForm>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (name:string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    })
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    let errors:SignUpForm = {
      password: "",
      repeatedPassword: "",
      passwords: ""
    };

    if (!formValues.password ) {
      errors.password = "Can't be empty"
    }

    if (!formValues.repeatedPassword ) {
      errors.repeatedPassword = "Can't be empty"
    }

    if (formValues.password !== formValues.repeatedPassword) {
      errors.passwords = "Passwords do not match"
    }

    setErrors({...errors})

    try {
      await signUp(formValues.email, formValues.password);
      router.push("/");
    } catch(error: any) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        const codes: string[] = ["auth/invalid-email", "auth/email-already-in-use", "auth/missing-email"]
        const errorCode: string = codes.find(code => code === error.code) || ""
        const message:string = errorCode.slice(5).replaceAll('-', ' ');
        const errorMessage = message.charAt(0).toUpperCase() + message.slice(1);
        setErrorMessage(errorMessage);
      }
    }
  };

  useEffect(() => {
    router.prefetch('/')
  }, []);

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="mt-20">
        <Image 
          className="mx-auto mb-20" 
          src="/images/logo/logo.svg"
          width={33} 
          height={27}
          alt="logo" 
        />
        <form 
          className="w-72 min-[375px]:w-80 md:w-[400px] h-auto bg-blue-700 rounded-[20px] p-8 text-white text-sm font-light"
          onSubmit={handleOnSubmit}
        >
          <h2 className="text-2xl mb-10">Sign Up</h2>
          <div className="space-y-8">
          <div className="relative">
            <input 
              className={!loading && errorMessage ? "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-red focus:outline-0 focus:border-b-white caret-red cursor-pointer" : "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer"} 
              type="text"
              placeholder="Email address"
              value={formValues.email}
              onChange={(e) => handleOnChange("email", e.target.value)}
            />
           {!loading && <p className="absolute top-0 right-0 text-xs text-red">{errorMessage}</p>}
          </div>
          <div className="relative">
            <input 
              className={!loading && errors?.password ? "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-red focus:outline-0 focus:border-b-white caret-red cursor-pointer" : "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer"} 
              type="password" 
              placeholder="Password"
              value={formValues.password}
              onChange={(e) => handleOnChange("password", e.target.value)}
            />
            {!loading && <p className="absolute top-0 right-0 text-xs text-red">{errors?.password}</p>}
            <p className="absolute top-10 italic text-[12px] text-white">Password should be at least 6 characters</p>
          </div>
          <div className="relative">
            <input 
              className={!loading && errors?.repeatedPassword ? "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-red focus:outline-0 focus:border-b-white caret-red cursor-pointer" : "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer"} 
              type="password" 
              placeholder="Repeat password"
              value={formValues.repeatedPassword}
              onChange={(e) => handleOnChange("repeatedPassword", e.target.value)}
            />
            {!loading && <p className="absolute top-0 right-0 text-xs text-red">{errors?.repeatedPassword}</p>}
          </div>
          <button 
            type="submit"
            className=" w-full bg-red h-12 rounded-md hover:bg-white hover:text-blue-900"
          >
            Create an account
          </button>
          {!loading && <p className={!loading && errors?.passwords ? "block text-center text-red" : "hidden"}>{errors?.passwords}</p>}
          <p className="text-center">Already have an account? <Link href="/login"><span className="text-red">Login</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;