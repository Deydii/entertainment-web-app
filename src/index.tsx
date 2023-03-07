import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { UserContextProvider } from './context/userContext';
import { DataContextProvider } from './context/dataContext';
import Home from './routes/Home/home';
import Cards from './routes/cards';
import Bookmarked from './routes/bookmarked';
import Login from './routes/login';
import SignUp from './routes/signup';
import reportWebVitals from './reportWebVitals';


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
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "signup",
    element: <SignUp />
  }
])

root.render(
    <UserContextProvider>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
