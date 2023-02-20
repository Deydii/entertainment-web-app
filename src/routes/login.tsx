import { Link } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

const Login = () => {
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="mt-20">
        <img className="mx-auto mb-20" src={logo} alt="logo" />
        <form className="w-72 min-[375px]:w-80 md:w-[400px] h-auto bg-blue-700 rounded-[20px] p-8 text-white text-sm font-light">
          <h2 className="text-2xl mb-10">Login</h2>
          <div className="space-y-8">
          <input 
            className="w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer" 
            type="text"
            placeholder="Email address"
          />
          <input 
            className="w-full pb-5 bg-transparent placeholder:text-sm placeholder:opacity-50 placeholder:indent-3 outline-1 border-b border-b-white/50 focus:outline-0 focus:border-b-white caret-red cursor-pointer" 
            type="password" 
            placeholder="Password"
          />
          <button className=" w-full bg-red h-12 rounded-md hover:bg-white hover:text-blue-900">Login to your account</button>
          <p className="text-center">Don't have an account?  <Link to="/signup"><span className="text-red">Sign Up</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;