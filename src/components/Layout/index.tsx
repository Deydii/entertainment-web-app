import { ReactNode } from 'react';
import Navbar from '../Navbar';
import SearchBar from '../SearchBar';

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col lg:flex-row">
      <header className="w-full lg:w-32 lg:pl-8">
        <Navbar />
      </header>
      <div className="ml-4 mb-14 md:ml-6 lg:ml-8 md:w-full lg:w-[90%]">
        <SearchBar />
        <main>{children}</main>
      </div>
    </div>
  )
};

export default Layout;
