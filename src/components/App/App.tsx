import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import Home from '../Home';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-900 lg:flex-row">
      <Navbar />
      <div className="ml-10 w-[90%]">
      <SearchBar />
      <Home />
      </div>
    </div>
  );
}

export default App;
