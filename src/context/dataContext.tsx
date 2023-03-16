import { createContext, useState, useEffect, ReactNode } from 'react';
//import { Results } from '../interface/results';
//import dataApp from '../data/data.json';

interface ResultsContext {
  //data: Results[],
  getShows: (value: string) => void,
  show: string,
  handleBookmarkedShows: (value: string) => void
}

const defaultState = {
 // data: [],
  getShows: () => {},
  show: "",
  handleBookmarkedShows: () => {},
}

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  //const [data, setData] = useState<Results[]>([]);
  const [show, setShow] = useState("");

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

  const getShows = (value: string):void => {
    setShow(value);
  };

  const handleBookmarkedShows = (value: string):void => {
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
      //data,
      getShows,
      show,
      handleBookmarkedShows
    }}>
      {children}
    </DataContext.Provider>
  )
}