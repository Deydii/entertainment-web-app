import logo from '../../images/logo/logo.svg';
import LinksMenu from './Links';
import avatar from '../../images/avatar/image-avatar.png';

const Navbar = () => {
  return(
    <nav className="flex justify-between items-center relative h-20 px-8 bg-blue-700 md:rounded-[20px] md:m-8 lg:flex-col lg:justify-start lg:w-[7%] lg:h-[960px] lg:ml-8 lg:pt-11 lg:px-0">
      <img className="w-[25px] h-5 lg:w-auto lg:h-auto" src={logo} alt="logo" />
      <LinksMenu />
      <img className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mt-86 rounded-full border-white border-2 lg:absolute lg:bottom-9" src={avatar} alt="avatar" />
    </nav>
  )
};

export default Navbar;