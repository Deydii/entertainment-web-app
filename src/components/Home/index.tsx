import TrendingCard from "./Trending";
import Card from '../Card';

const Home = () => {
  return (
    <div className="mt-4 text-white">
      <h3 className="text-[20px] md:text-2xl">Trending</h3>
      <div className="mt-8 flex overflow-x-auto space-x-4 md:space-x-8">
        <TrendingCard />
      </div>
      <h3 className="mt-8 text-2xl">Recommended for you</h3>
      <div className="mt-8 mb-10 grid grid-cols-4 gap-x-1 gap-y-10">
        <Card />
      </div>
    </div>
  )
};

export default Home;