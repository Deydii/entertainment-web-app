import { useContext } from 'react';
import { DataContext } from '../context/dataContext';
import { UserContext } from '../context/userContext';
import Card from '../components/Card';
import { Navigate } from 'react-router-dom';
import { Results } from '../interface/results';

const Bookmarked = () => {

  const { data, show } = useContext(DataContext);

  const {user} = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />
  };

  const results:Results[] = data.filter(results => results.isBookmarked);
  
  const movies:Results[] = results.filter(movie => movie.category.toLowerCase() === "movie");

  const series:Results[] = results.filter(serie => serie.category.toLowerCase() === "tv series");

  const bookmarkedShows: Results[] = results.filter(bookmarked => bookmarked.isBookmarked && bookmarked.title.toLowerCase().includes(show.toLowerCase()));

  return (
   <>
   {!show && (
    <>
    <h3 className="mt-4 text-white text-[20px] md:text-2xl">Bookmarked movies</h3>
    <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
      {movies.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
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
      })
    }
   </div>
   <h3 className="mt-12 text-white text-[20px] md:text-2xl">Bookmarked TV Series</h3>
    <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
      {series.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
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
      })
    }
   </div>
   </>
   )}
   {show && (
    <>
      <h3 className="mt-4 text-[20px] text-white md:text-2xl">{`Found ${bookmarkedShows.length} results for ${show}`}</h3>
      <div className="mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
        {bookmarkedShows.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
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

export default Bookmarked;