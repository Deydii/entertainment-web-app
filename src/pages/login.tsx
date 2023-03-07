import { useState, useContext } from 'react';
// import { UserContext } from '../context/userContext';
import { FirebaseError } from '@firebase/util';
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {

// const { signIn } = useContext(UserContext);
// const navigate = useNavigate();

const [formValues, setFormValues] = useState({
  email: "",
  password: ""
});

const [errors, setErrors] = useState("");
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

    if (!formValues.password ) {
      setErrors("Can't be empty")
    }

    try {
      // await signIn(formValues.email, formValues.password);
      // navigate("/");
    } catch(error: any) {
      setLoading(false);
      if (error instanceof FirebaseError) {
        const codes: string[] = ["auth/invalid-email", "auth/missing-email"]
        const errorCode: string = codes.find(code => code === error.code) || ""
        const message:string = errorCode.slice(5).replaceAll('-', ' ');
        const errorMessage = message.charAt(0).toUpperCase() + message.slice(1);
        setErrorMessage(errorMessage);

      if (error.code === "auth/user-not-found") {
        setErrorMessage("This email is not found");
      }

      if (error.code === "auth/wrong-password") {
        setErrors("Wrong password")
      }
      }
    }
  }

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
          <h2 className="text-2xl mb-10">Login</h2>
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
              className={!loading && errors ? "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-red focus:outline-0 focus:border-b-white caret-red cursor-pointer" : "w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer"} 
              type="password" 
              placeholder="Password"
              value={formValues.password}
              onChange={(e) => handleOnChange("password", e.target.value)}
            />
            {!loading && <p className="absolute top-0 right-0 text-xs text-red">{errors}</p>}
          </div>
          <button 
            type="submit"
            className=" w-full bg-red h-12 rounded-md hover:bg-white hover:text-blue-900"
          >
            Login to your account
          </button>
          <p className="text-center">Don't have an account?  <Link href="/signup"><span className="text-red">Sign Up</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;