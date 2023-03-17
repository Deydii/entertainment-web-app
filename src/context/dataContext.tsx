import { createContext, useState, useEffect, ReactNode } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher, baseUrl } from '../api';
import { Results } from '../interface/results';

interface ResultsContext {
  trendingShows: Results[],
  popularShows: Results[],
 // getShows: (value: string) => void,
  show: string,
  handleBookmarkedShows: (value: number) => void
}

const trendingUrl = `${baseUrl}trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

const moviesUrl = `${baseUrl}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;

const seriesUrl = `${baseUrl}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;

preload(trendingUrl, fetcher);
preload(moviesUrl, fetcher);
preload(seriesUrl, fetcher);

const defaultState = {
  trendingShows: [],
  popularShows: [],
  //getShows: () => {},
  show: "",
  handleBookmarkedShows: () => {},
};

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [trendingShows, setTrendingShows] = useState<Results[]>([]);
  const [popularShows, setPopularShows] = useState<Results[]>([]);
  const [show, setShow] = useState("");

  const { data: trending, error, isLoading } = useSWR(trendingUrl, fetcher);

  const { data: movies, error: moviesError, isLoading: moviesLoading } = useSWR(moviesUrl, fetcher);

  const { data: series, error: seriesError, isLoading: seriesLoading } = useSWR(seriesUrl, fetcher);
  

  const getPopularShows = () => {
    const seriesData = series?.results
      .map((series: Results) => Object.assign(series, {media: "tv"}))
      .filter((results: Results) => results.backdrop_path !== null);

    if (movies?.results && seriesData) {
      const showsArray: Results[] = [...movies.results, ...seriesData];
      setPopularShows(showsArray);
    }
  };

  useEffect(() => {
    setTrendingShows(trending?.results)
  }, [trending])

  useEffect(() => {
    getPopularShows()
  }, [movies, series]);

  useEffect(() => {
   const shows:string = localStorage.getItem('shows') || "[]";
   //const dataShows: Results[] = JSON.parse(shows);

    // if (shows === "[]") {
    //   //console.log(data);
    //   //setData(dataApp)
    // } else {
    //  // setData(dataShows);
    // }
  }, [])

  // const getShows = (value: string):void => {
  //   setShow(value);
  // };

  const handleBookmarkedShows = (value: number):void => {
    
    // const bookmarked = data.map(shows => {
    //   if (shows.title === value) {
    //     const bookmarkedValue = {
    //       ...shows,
    //       isBookmarked: !shows.isBookmarked
    //     }
    //     return bookmarkedValue
    //   }
    //   return shows
    // })
    //setData(bookmarked);
    
    //localStorage.setItem('shows', JSON.stringify(bookmarked));
  };

  return (
    <DataContext.Provider value={{ 
      trendingShows,
      popularShows,
      //getShows,
      show,
      handleBookmarkedShows
    }}>
      {children}
    </DataContext.Provider>
  )
}