import { useContext, ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { motion } from "framer-motion";
import { DataContext } from '../context/dataContext';
import Card from '../components/Card';
import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';
import { Results } from '../interface/results';

const Bookmarked: NextPageWithLayout = () => {

  const { shows, show } = useContext(DataContext);

  const [bookmarked, setBookmarked] = useState<Results[]>([]);

  const results:Results[] = shows.filter(results => results.isBookmarked); 

  const removeDuplicateShow = () => {
    const ids = results.map(show => show.id);
    const filteredShows = results.filter(({id}, index) => !ids.includes(id, index + 1));
    setBookmarked(filteredShows);
  }
  
  const movies:Results[] = bookmarked.filter(movie =>  movie.media_type !== "tv" && !movie.media);

  const series:Results[] = bookmarked.filter(serie => serie.media_type === "tv" || serie.media === "tv"  );

  const bookmarkedShows: Results[] = bookmarked.filter(bookmarkedShow =>  bookmarkedShow.title?.toLowerCase().includes(show.toLowerCase()) || bookmarkedShow.name?.toLowerCase().includes(show.toLowerCase()));

  useEffect(() => removeDuplicateShow(), [shows]);

  return (
   <>
   {!show && (
    <>
    <h3 className="mt-4 text-white text-[20px] md:text-2xl">Bookmarked movies</h3>
    <motion.div
      initial={{opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
        {movies.map(({ id, name, title, first_air_date, release_date, backdrop_path, media_type, media, isBookmarked }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              title={title}
              first_air_date={first_air_date}
              release_date={release_date}
              backdrop_path={backdrop_path}
              media_type={media_type}
              media={media}
              isBookmarked={isBookmarked}
            />
          )
        })}
      </div>
    </motion.div>
   <h3 className="mt-12 text-white text-[20px] md:text-2xl">Bookmarked TV Series</h3>
   <motion.div
      initial={{opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
        {series.map(({ id, name, title, first_air_date, release_date, backdrop_path, media_type, media, isBookmarked }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              title={title}
              first_air_date={first_air_date}
              release_date={release_date}
              backdrop_path={backdrop_path}
              media_type={media_type}
              media={media}
              isBookmarked={isBookmarked}
            />
          )
        })}
      </div>
    </motion.div>
   </>
   )}
   {show && (
    <>
      <h3 className="mt-4 text-[20px] text-white md:text-2xl">{`Found ${bookmarkedShows.length} results for ${show}`}</h3>
      <div className="mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
        {bookmarkedShows.map(({ id, name, title, first_air_date, release_date, backdrop_path, media_type, media, isBookmarked }) => {
          return (
            <Card 
              key={id}
              id={id}
              name={name}
              title={title}
              first_air_date={first_air_date}
              release_date={release_date}
              backdrop_path={backdrop_path}
              media_type={media_type}
              media={media}
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

Bookmarked.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    let cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    return {
      props: {
        uid
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default Bookmarked;