import { createContext, useState, useEffect, ReactNode } from 'react';
import { Results } from '../interface/results';
import dataApp from '../data/data.json';

interface ResultsContext {
  data: Results[],
  getShows: (value: string) => void,
  show: string
}

const defaultState = {
  data: [],
  getShows: () => {},
  show: ""
}

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [data, setData] = useState<Results[]>([]);
  const [show, setShow] = useState("")

  useEffect(() => setData(dataApp), []);

  const getShows = (value: string):void => {
    setShow(value);
  }

  return (
    <DataContext.Provider value={{ 
      data,
      getShows,
      show
    }}>
      {children}
    </DataContext.Provider>
  )
}