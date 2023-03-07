import { useContext } from 'react';
import { Transition } from '@headlessui/react';
import { DataContext } from '../context/dataContext';
import TrendingCard from "./Trending";
import Card from '../components/Card';
import { Results } from '../interface/results';

const Home = () => {

  const { data, show } = useContext(DataContext);

  const trending:Results[] = data.filter(trending => trending.isTrending);

  const results:Results[] = data.filter(shows => shows.title.toLowerCase().includes(show.toLowerCase()));

  return (
    <div className="mt-4 text-white">
      {!show && (
        <>
        <Transition show={true}>
          <h3 className="text-[20px] md:text-2xl">Trending</h3>
          <Transition.Child
            data-testid="transition"
            enter="transition-opacity duration-700"
            enterFrom="opacity-0"
            enterTo='opacity-100'
          >
            <div className="mt-8 pr-8 flex overflow-x-scroll overflow-y-hidden space-x-4 md:space-x-8 transition duration-700 ease-in">
              {trending.map(({ title, thumbnail, year, category, rating }) => {
                return (
                  <TrendingCard 
                    key={title}
                    title={title}
                    thumbnail={thumbnail.trending}
                    year={year}
                    category={category}
                    rating={rating}
                  />
                  )
                })
              }
            </div>
          </Transition.Child>
          <h3 className="mt-8 text-[20px] md:text-2xl">Recommended for you</h3>
          <Transition.Child
            data-testid="transition"
            enter="transition-opacity duration-700"
            enterFrom="opacity-0"
            enterTo='opacity-100'
          >
            <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
              {data.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
                return (
                  <Card 
                    key={title}
                    title={title}
                    thumbnail={thumbnail.regular}
                    year={year}
                    category={category}
                    rating={rating}
                    isBookmarked={isBookmarked}
                  />
                )
              })}
            </div>
           </Transition.Child>
          </Transition>
        </>
        )
      }
      {show && (
        <>
          <h3 className="text-[20px] md:text-2xl">{`Found ${results.length} results for ${show}`}</h3>
          <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
            {results.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
              return (
                <Card 
                  key={title}
                  title={title}
                  thumbnail={thumbnail.regular}
                  year={year}
                  category={category}
                  rating={rating}
                  isBookmarked={isBookmarked}
                />
              )
            })}
          </div>
        </>
      )} 
    </div>
  )
};

export default Home;