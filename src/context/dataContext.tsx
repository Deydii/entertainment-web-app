import { createContext, useState, useEffect, ReactNode } from 'react';
import { Results } from '../interface/results';
import dataApp from '../data/data.json';

interface ResultsContext {
  data: Results[],
}

const defaultState = {
  data: [],
}

export const DataContext = createContext<ResultsContext>(defaultState);

export const DataContextProvider = ({ children }: {children: ReactNode}) => {
  
  const [data, setData] = useState<Results[]>([]);

  useEffect(() => setData(dataApp), []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  )
}