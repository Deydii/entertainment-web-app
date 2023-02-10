import TrendingCard from "./Card";

const Home = () => {
  return (
    <div className="mt-4 text-white">
      <h3 className="text-2xl">Trending</h3>
      <div className="mt-8 flex overflow-x-auto space-x-8">
        <TrendingCard />
      </div>
    </div>
  )
};

export default Home;