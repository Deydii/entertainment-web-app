import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import Home from '../Home';

const App = () => {
  return (
    <div className="min-h-screen flex bg-blue-900">
      <Navbar />
      <div className="ml-10 w-[90%]">
      <SearchBar />
      <Home />
      </div>
    </div>
  );
}

export default App;
