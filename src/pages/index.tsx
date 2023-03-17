import { useContext, ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { motion } from "framer-motion";
import { DataContext } from '../context/dataContext';
import Layout from '../components/Layout';
import type { NextPageWithLayout } from './_app';
import TrendingCard from "./Trending";
import Card from '../components/Card';
import { Results } from '../interface/results';

// interface DataCard {
//   id: number,
//   name: string,
//   title: string,
//   release_date: string,
//   first_air_date: string,
//   media_type: string, 
//   backdrop_path: string,
//   adult?: boolean
// }

const Home: NextPageWithLayout = () => {

  const { trendingShows, popularShows, show } = useContext(DataContext);

 // const results:Results[] = data.filter(shows => shows.title.toLowerCase().includes(show.toLowerCase()));
  return (
    <div className="mt-4 text-white">
      {!show && trendingShows && popularShows && (
        <>
          <h3 className="text-[20px] md:text-2xl">Trending</h3>
          <motion.div
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <div className="mt-8 pr-8 flex overflow-x-scroll overflow-y-hidden space-x-4 md:space-x-8 transition duration-700 ease-in">
              {trendingShows
                .filter((results: Results) => results.media_type === "movie" && "tv")
                .map(({ id, name, title, first_air_date, release_date, media_type, backdrop_path }) => {
                return (
                  <TrendingCard 
                    key={id}
                    name={name}
                    title={title}
                    first_air_date={first_air_date}
                    release_date={release_date}
                    category={media_type}
                    backdrop_path={backdrop_path}
                  />
                  )
                })
              }
            </div>
          </motion.div>
          <h3 className="mt-8 text-[20px] md:text-2xl">Recommended for you</h3>
          <motion.div
            initial={{opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-2 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
              {popularShows.map(({ id, name, title, first_air_date, release_date, backdrop_path, adult }) => {
                return (
                  <Card 
                    key={id}
                    id={id}
                    name={name}
                    title={title}
                    first_air_date={first_air_date}
                    release_date={release_date}
                    backdrop_path={backdrop_path}
                    adult={adult}
                  />
                )
              })}
            </div>
          </motion.div>
        </>
        )
      }
      {show && (
        <>
          {/* <h3 className="text-[20px] md:text-2xl">{`Found ${results.length} results for ${show}`}</h3> */}
          <div className="mt-6 mr-4 md:mr-6 lg:mr-8 lg:mt-8 grid grid-cols-1 gap-x-4 md:gap-x-7 lg:gap-x-10 gap-y-8 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1700px]:grid-cols-5">
            {/* {results.map(({ title, thumbnail, year, category, rating, isBookmarked }) => {
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
            })} */}
          </div>
        </>
      )} 
    </div>
  )
};

Home.getLayout = function getLayout(page: ReactElement) {
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

export default Home;