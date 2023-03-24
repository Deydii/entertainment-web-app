import { createContext, useState, useEffect, ReactNode } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher, baseUrl } from '../api';
import { Results } from '../interface/results';

interface ResultsContext {
  shows: Results[],
  isLoadingShows: boolean,
  searchShows: (value: string) => void,
  show: string,
  handleBookmarkedShows: (value: number) => void,
  isError: boolean
}

const trendingUrl = `${baseUrl}trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

const moviesUrl = `${baseUrl}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=FR`;

const seriesUrl = `${baseUrl}tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=FR`;

preload(trendingUrl, fetcher);
preload(moviesUrl, fetcher);
preload(seriesUrl, fetcher);

const defaultState = {
  shows: [],
  isLoadingShows: false,
  searchShows: () => {},
  show: "",
  handleBookmarkedShows: () => {},
  isError: false
};

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [shows, setShows] = useState<Results[]>([]);
  const [trendingShows, setTrendingShows] = useState<Results[]>([]);
  const [popularMovies, setPopularMovies] = useState<Results[]>([]);
  const [popularSeries, setPopularSeries] = useState<Results[]>([]);
  const [isLoadingShows, setIsLoadingShows] = useState(false);
  const [show, setShow] = useState("");
  const [isError, setIsError] = useState(false);

  const { data: trending, error, isLoading } = useSWR(trendingUrl, fetcher);

  const { data: movies, error: moviesError, isLoading: moviesLoading } = useSWR(moviesUrl, fetcher);

  const { data: series, error: seriesError, isLoading: seriesLoading } = useSWR(seriesUrl, fetcher);
  
  const handleErrors = () => {
    if (error || moviesError || seriesError) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }

  useEffect(() => handleErrors(), []);

  const getTrendingShows = async () => {
    const trendingData = await trending?.results?.map((data: Results) => Object.assign(data, { isTrending: true, isBookmarked: false }));
    if (trendingData) {
      setTrendingShows(trendingData);
    }
  };

  const getPopularMovies = async () => {
    const moviesData = await movies?.results?.map((movie: Results) => Object.assign(movie, { isTrending: false, isBookmarked: false }));
    if (moviesData) {
      setPopularMovies(moviesData)
    }
  };

  const getPopularSeries = async () => {
    const seriesData = await series?.results?.map((serie: Results) => Object.assign(serie, { media: "tv", isTrending: false, isBookmarked: false }))
      .filter((results: Results) => results.backdrop_path !== null);
    if (seriesData) {
      setPopularSeries(seriesData)
    }
  };
 
  useEffect(() => {
    getTrendingShows();
  }, [trending])

  useEffect(() => {
    getPopularMovies();
  }, [movies]);

  useEffect(() => {
    getPopularSeries();
  }, [series]);

  useEffect(() => {
   setIsLoadingShows(true);
   const showsLocalStorage:string = localStorage.getItem('shows') || "[]";
   const allShows = trendingShows.concat(popularMovies, popularSeries);  

    if (!shows && showsLocalStorage === "[]") {
      setShows(allShows);
      setIsLoadingShows(false);
    } else {
      const showsData : Results[] = JSON.parse(showsLocalStorage);
      const newShowsArray = allShows?.map(show => {
        for (let i = 0; i < showsData.length; i++) {
          if (show.id === showsData[i].id) {
            const bookmarkedValue = {
              ...show,
              isBookmarked: showsData[i].isBookmarked
            }
            return bookmarkedValue
          }
        }
        return show
      })
      setShows(newShowsArray);
      setIsLoadingShows(false);
    }

  }, [trendingShows, popularMovies, popularSeries]);


  const searchShows = (value: string):void => {
    setShow(value);
  }; 

   const handleBookmarkedShows = (value: number):void => {
    const bookmarkedArray: Results[] = [];

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

    for (let i = 0; i < bookmarked.length; i++) {
      if (bookmarked[i].isBookmarked) {
        bookmarkedArray.push(bookmarked[i]);
      }
    };
   localStorage.setItem('shows', JSON.stringify(bookmarkedArray));

   };

  return (
    <DataContext.Provider value={{ 
      shows,
      isLoadingShows,
      searchShows,
      show,
      handleBookmarkedShows,
      isError
    }}>
      {children}
    </DataContext.Provider>
  )
}