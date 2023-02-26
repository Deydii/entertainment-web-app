import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from '../../context/userContext';
import { DataContextProvider } from "../../context/dataContext";
import Bookmarked from "../../routes/bookmarked";
import Cards from "../../routes/cards";
import Home from "../../routes/Home/home";
import Login from "../../routes/login";
import Root from "../../routes/root";
import SignUp from "../../routes/signup";


describe('Login component', () => {

  const routes = [
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
  ];

  const component = 
    <UserContextProvider>
      <DataContextProvider>
        <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/signup']})}/>
      </DataContextProvider>
    </UserContextProvider>


  test('Sign up page', async () => {   
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "mail@test.fr");
    
    const passwordInputs =  await screen.findAllByPlaceholderText(/password/i);
    const password = passwordInputs[0];
    await user.type(password, "testtest");

    const repeatedPassword = passwordInputs[1];
    await user.type(repeatedPassword, "testtest");

    const button = await screen.findByRole('button');
    await user.click(button);

    const login = await screen.findByRole('button', {name: /login to your account/i});
    expect(login).toBeInTheDocument();
  });

  test("Sign in page", async () => {
    const user = userEvent.setup();
    render(component);
  
    const email = await screen.findByRole('textbox');
    await user.type(email, "mail@test.fr");
    
    const password = await screen.findByPlaceholderText(/password/i);
    await user.type(password, "testtest");
  
    const button = await screen.findByRole('button');
    await user.click(button);

    const trendingTitle = await screen.findByText(/trending/i);
    const recommendedShows = await screen.findByText(/recommended for you/i);

    expect(trendingTitle).toBeInTheDocument();
    expect(recommendedShows).toBeInTheDocument();
  });

  test('home page', async () => {
    render(component)

    const trendingCards = await screen.findAllByTestId(/trending/i);
    const cards = await screen.findAllByTestId(/cards/i)
    expect(trendingCards).toHaveLength(5);
    expect(cards).toHaveLength(29);
  });

  test('Search Bar', async () => {
    const user = userEvent.setup();
    render(component);

    const searchBar = await screen.findByRole("textbox");
    await user.type(searchBar, "earth");

    const text = await screen.findByText(/found 2 results for earth/i, {exact: true});
    const results = await screen.findAllByText(/earth/i);

    expect(text).toBeInTheDocument();
    expect(results).toHaveLength(3);

    await user.clear(searchBar);
    await user.type(searchBar, "new");
    const textResults = await screen.findByText(/found 0 results for new/i);
    expect(textResults).toBeInTheDocument();
  });

  test('Movies page', async () => {
    const user = userEvent.setup();
    render(component);

    const navbarLinks = await screen.findAllByRole("link");
    await user.click(navbarLinks[1]);

    const title = await screen.findByText(/movies/i);
    expect(title).toBeInTheDocument();

    const searchBar = await screen.findByRole("textbox");
    await user.type(searchBar, "great");

    const results = await screen.findAllByText(/the great Lands/i, {exact: true});
    expect(results).toHaveLength(1);
  });

  test('TV series page', async () => {
    const user = userEvent.setup();
    render(component);

    const navbarLinks = await screen.findAllByRole("link");
    await user.click(navbarLinks[2]);

    const searchBar = await screen.findByRole("textbox");
    await user.type(searchBar, "112");

    const svgDiv = await screen.findByTestId('svg');
    await user.click(svgDiv);

    const results = await screen.findAllByText("112", {exact: true});
    expect(results).toHaveLength(1);
  });

  test('Bookmarked page', async () => {
    const user = userEvent.setup();
    render(component);

    const navbarLinks = await screen.findAllByRole("link");
    await user.click(navbarLinks[3]);

    const title1 = await screen.findByText(/bookmarked movies/i);
    expect(title1).toBeInTheDocument();

    const title2 = await screen.findByText(/bookmarked tv Series/i);
    expect(title2).toBeInTheDocument();

    const newBookmarked = await screen.findByText("112");
    expect(newBookmarked).toBeInTheDocument();

    const searchBar = await screen.findByRole("textbox");
    await user.type(searchBar, "bottom");

    const results = await screen.findAllByText(/bottom/i, {exact: true});
    expect(results).toHaveLength(1);
  });

  test('Sign out', async () => {
    const user = userEvent.setup();
    render(component);

    const signOutButton = await screen.findByRole("button");
    await user.click(signOutButton);

    const loginButton = await screen.findByRole("button", {name: /login to your account/i});
    expect(loginButton).toBeInTheDocument();
  });
});