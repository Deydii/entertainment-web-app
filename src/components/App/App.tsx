import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import Home from '../Home';

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col lg:flex-row">
       <header className="w-full lg:w-[14%] lg:pl-8">
        <Navbar />
      </header>
    <div className="ml-4 mb-14 md:ml-6 lg:ml-8 md:w-full lg:w-[90%]">
      <SearchBar />
       <Home />
      </div> 
    </div>
  );
}

export default App;
