import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { DataContextProvider } from './context/dataContext';
import Home from './routes/Home/home';
import Cards from './routes/cards';
import Bookmarked from './routes/bookmarked';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "movies",
        element: <Cards name="movie" />
      },
      {
        path: "tv-series",
        element: <Cards name="tv series" />
      },
      {
        path: "bookmarked",
        element: <Bookmarked />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
