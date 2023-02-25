import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from '../../context/userContext';
import SignUp from "../../routes/signup";
import SearchBar from '../../components/SearchBar';
import Login from "../../routes/login";

describe('Login component', () => {

  const routes = [
    {
      path: "/",
      element: <SearchBar />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "signup",
      element: <SignUp />
    }
  ]

  const component = 
    <UserContextProvider>
      <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/login']})}/>
    </UserContextProvider>


  test('Error messages if inputs are empty', async () => {
    const user = userEvent.setup();
    render(component);

    const button = await screen.findByRole('button');
    await user.click(button);

    const emailErrorMessage = await screen.findByText("Invalid email");
    expect(emailErrorMessage).toBeInTheDocument();
    
    const passwordErrorMessage = await screen.findByText("Can't be empty");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test('Error message if email is not found', async () => {
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "mail@test.fr");

    const password = await screen.findByPlaceholderText(/password/i);
    await user.type(password, "testtest");

    const button = await screen.findByRole('button');
    await user.click(button);
    
    const emailErrorMessage = await screen.findByText("This email is not found");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  test('Error message if password input is empty', async () => {
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "mail@test.net");

    const button = await screen.findByRole('button');
    await user.click(button);
    
    const passwordErrorMessage = await screen.findByText("Can't be empty");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test('Error message if password is incorrect', async () => {
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "mail@test.net");

    const password = await screen.findByPlaceholderText(/password/i);
    await user.type(password, "testtests");

    const button = await screen.findByRole('button');
    await user.click(button);
    
    const passwordErrorMessage = await screen.findByText("Wrong password");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test('User can sign in', async () => {
  const user = userEvent.setup();
  render(component);

  const email = await screen.findByRole('textbox');
  await user.type(email, "mail@test.net");
  
  const password = await screen.findByPlaceholderText(/password/i);
  await user.type(password, "testtest");

  const button = await screen.findByRole('button');
  await user.click(button);

  const searchBar = await screen.findByPlaceholderText(/search for movie or tv series/i);
  expect(searchBar).toBeInTheDocument();
});
});