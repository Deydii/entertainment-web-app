import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LinksMenu from './Links';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {

  const styles = { 
    backgroundColor: "rgb(51 65 85)", 
    fontSize: "15px",
    padding: "4px 10px"
  };

  const { signOutApp } = useContext(UserContext);
  const router =  useRouter();

  const handleOnClick = async () => {
   try {
    signOutApp();
    router.push("/login");
   } catch(error) {
    return error
   }
  };

  useEffect(() => {
    router.prefetch('/login')
  }, []);

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
        <svg className="w-6 h-6 md:w-8 md:h-8" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="none"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#5A698F" />
          <path fillRule="evenodd" clipRule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#5A698F"/>
        </svg>
        <button
          className="sign-out"
          type="button"
          onClick={handleOnClick}
        >
          <svg className="fill-[#5A698F] w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24">
            <path d="M4 12a1 1 0 001 1h7.59l-2.3 2.29a1 1 0 000 1.42 1 1 0 001.42 0l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33l-4-4a1 1 0 10-1.42 1.42l2.3 2.29H5a1 1 0 00-1 1zM17 2H7a3 3 0 00-3 3v3a1 1 0 002 0V5a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-2 0v3a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3z" />
          </svg>
          <Tooltip anchorSelect=".sign-out" place="bottom" style={styles}>
            Sign out
          </Tooltip>
        </button>
      </div>
    </nav>  
  )
};

export default Navbar;