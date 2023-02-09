import logo from '../../assets/logo/logo.svg';
import LinksMenu from './Links';
import avatar from '../../assets/avatar/image-avatar.png';

const Navbar = () => {
  return(
    <nav className="flex flex-col items-center relative w-[7%] my-8 ml-8 pt-11 rounded-[20px] bg-blue-700">
      <img src={logo} alt="logo" />
      <LinksMenu />
      <img className="absolute bottom-9	w-10 h-10 mt-86 rounded-full border-white border-2" src={avatar} alt="avatar" />
    </nav>
  )
};

export default Navbar;