import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { DataContextProvider } from './context/dataContext';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  }
])

root.render(
  <React.StrictMode>
    <DataContextProvider>
    <div className="min-h-screen w-full overflow-hidden flex flex-col lg:flex-row">
      <header className="w-full lg:w-32 lg:pl-8">
        <Navbar />
      </header>
      <div className="ml-4 mb-14 md:ml-6 lg:ml-8 md:w-full lg:w-[90%]">
        <SearchBar />
        <RouterProvider router={router} />
      </div>
    </div>
    </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
