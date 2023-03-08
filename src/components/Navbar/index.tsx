import { useContext } from 'react';
// import { UserContext } from '../../context/userContext';
import Image from 'next/image';
import LinksMenu from './Links';

const Navbar = () => {

  // const { signOutApp } = useContext(UserContext);

  const handleOnClick = async () => {
   try {
    // signOutApp();
    // navigate("/login")
   } catch(error) {
    return error
   }
  };

  return(
    <nav className="flex justify-center items-center relative h-20  bg-blue-700 md:w-[90%] md:rounded-[20px] md:mx-auto md:mt-4 lg:flex-col lg:justify-start lg:w-24 lg:h-[960px] lg:mt-8 lg:mx-0 lg:pt-11">
      <div className="absolute left-4 w-[25px] h-5 md:left-9">
        <Image
          src="/images/logo/logo.svg"
          width={100}
          height={100}
          alt="logo" 
        />
      </div>
      <LinksMenu />
      <div className="absolute right-2 space-x-2 md:right-8 flex items-center md:space-x-3 lg:flex-col lg:space-y-6 lg:space-x-0 lg:bottom-9">
        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
          <Image 
            className="mt-86 rounded-full border-white border-2" 
            src="/images/avatar/image-avatar.png" 
            width={100}
            height={100}
            alt="avatar" 
          />
        </div>
        <button
          type="button"
          onClick={handleOnClick}
        >
          <svg className="fill-[#5A698F] w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24">
            <path d="M4 12a1 1 0 001 1h7.59l-2.3 2.29a1 1 0 000 1.42 1 1 0 001.42 0l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33l-4-4a1 1 0 10-1.42 1.42l2.3 2.29H5a1 1 0 00-1 1zM17 2H7a3 3 0 00-3 3v3a1 1 0 002 0V5a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3z" />
          </svg>
        </button>
      </div>
    </nav>  
  )
};

export default Navbar;