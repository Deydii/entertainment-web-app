import { createContext, useState, useEffect, ReactNode } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher, baseUrl } from '../api';
import { Results } from '../interface/results';

interface ResultsContext {
  // trendingShows: Results[],
  // popularShows: Results[],
  shows: Results[],
 // getShows: (value: string) => void,
  show: string,
  handleBookmarkedShows: (value: number) => void
}

const trendingUrl = `${baseUrl}trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

const moviesUrl = `${baseUrl}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=FR`;

const seriesUrl = `${baseUrl}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=FR`;

preload(trendingUrl, fetcher);
preload(moviesUrl, fetcher);
preload(seriesUrl, fetcher);

const defaultState = {
  shows: [],
  // trendingShows: [],
  // popularShows: [],
  //getShows: () => {},
  show: "",
  handleBookmarkedShows: () => {},
};

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [shows, setShows] = useState<Results[]>([]);
  const [trendingShows, setTrendingShows] = useState<Results[]>([]);
  const [popularShows, setPopularShows] = useState<Results[]>([]);
  const [show, setShow] = useState("");

  const { data: trending, error, isLoading } = useSWR(trendingUrl, fetcher);

  const { data: movies, error: moviesError, isLoading: moviesLoading } = useSWR(moviesUrl, fetcher);

  const { data: series, error: seriesError, isLoading: seriesLoading } = useSWR(seriesUrl, fetcher);
  
  const getTrendingShows = () => {
    const trendingData = trending?.results.map((data: Results) => Object.assign(data, {isTrending: true, isBookmarked: false}));
    setTrendingShows(trendingData);
  }

  const getPopularShows = () => {

    const moviesData = movies?.results.map((movie: Results) => Object.assign(movie, {isTrending: false, isBookmarked: false}));

    const seriesData = series?.results
      .map((serie: Results) => Object.assign(serie, {media: "tv", isTrending: false, isBookmarked: false}))
      .filter((results: Results) => results.backdrop_path !== null);

    if (movies?.results && seriesData) {
      const showsArray: Results[] = [...moviesData, ...seriesData];
      setPopularShows(showsArray);
    }
  };

  useEffect(() => {
    getTrendingShows();
  }, [trending])

  useEffect(() => {
    getPopularShows()
  }, [movies, series]);

  useEffect(() => {
    if (trendingShows && popularShows) {
      const showsData = [...trendingShows, ...popularShows];
      setShows(showsData);
    }
  }, [trendingShows, popularShows])

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
    const bookmarked = shows.map(show => {
      if (show.id === value) {
        const bookmarkedValue = {
          ...show,
          isBookmarked: !show.isBookmarked
        }
       return bookmarkedValue
      }
      return show
    })
    setShows(bookmarked);
    //localStorage.setItem('shows', JSON.stringify(bookmarked));
   };

  return (
    <DataContext.Provider value={{ 
      shows,
      //getShows,
      show,
      handleBookmarkedShows
    }}>
      {children}
    </DataContext.Provider>
  )
}