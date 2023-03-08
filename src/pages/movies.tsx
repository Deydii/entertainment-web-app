import { useContext, ReactElement } from 'react';
import { Transition } from '@headlessui/react';
import { DataContext } from '../context/dataContext';
import Card from '../components/Card';
import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';
import { Results } from '../interface/results';

const Movies: NextPageWithLayout = () => {

  const { data, show } = useContext(DataContext);

  const results:Results[] = data.filter(results => results.category.toLowerCase() === "movie");

  const shows:Results[] = data.filter(shows => shows.title.toLowerCase().includes(show.toLowerCase()) && shows.category.toLowerCase() === "movie");

  return (
   <>
   {!show && (
    <>
    <h3 className="mt-4 text-white text-[20px] md:text-2xl">Movies</h3>
    {/* <Transition
      appear={true}
      show={true} 
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo='opacity-100'
    > */}
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
   {/* </Transition> */}
   </>
   ) 
  }
  {show && (
    <>
      <h3 className="mt-4 text-[20px] text-white md:text-2xl">{`Found ${shows.length} results for ${show}`}</h3>
        <div className="mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
          {shows.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
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
  </>
  );
};

Movies.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
};

export default Movies;