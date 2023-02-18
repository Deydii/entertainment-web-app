import { createContext, useState, useEffect, ReactNode } from 'react';
import { Results } from '../interface/results';
import dataApp from '../data/data.json';

interface ResultsContext {
  data: Results[],
  getShows: (value: string) => void,
  show: string,
  handleBookmarkedShows: (value: string) => void
}

const defaultState = {
  data: [],
  getShows: () => {},
  show: "",
  handleBookmarkedShows: () => {},
}

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [data, setData] = useState<Results[]>([]);
  const [show, setShow] = useState("");

  useEffect(() => setData(dataApp), []);

  useEffect(() => localStorage.setItem('shows', JSON.stringify(data)), [data]);


  const getShows = (value: string):void => {
    setShow(value);
  };

  const handleBookmarkedShows = (value: string):void => {
    const bookmarked = data.map(show => {
      if (show.title === value) {
        const bookmarkedArray = {
          ...show,
          isBookmarked: !show.isBookmarked
        }
        return bookmarkedArray
      }
      return show
    })
    setData(bookmarked)
  };

  return (
    <DataContext.Provider value={{ 
      data,
      getShows,
      show,
      handleBookmarkedShows
    }}>
      {children}
    </DataContext.Provider>
  )
}