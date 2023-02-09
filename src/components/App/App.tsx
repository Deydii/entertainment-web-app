import Navbar from "../Navbar";
import SearchBar from "../SearchBar";

const App = () => {
  return (
    <div className="min-h-screen flex bg-blue-900">
      <Navbar />
      <div className="mx-10 w-[90%]">
      <SearchBar />
      </div>
    </div>
  );
}

export default App;
