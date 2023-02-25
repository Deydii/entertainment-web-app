import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from '../../context/userContext';
import SignUp from "../../routes/signup";
import Root from "../../routes/root";
import Login from "../../routes/login";

describe('Sign up component', () => {

  const routes = [
    {
      path: "/",
      element: <Root />
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
      <RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/signup']})}/>
    </UserContextProvider>


  test('User can sign in', async () => {
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "test@test.com");
    expect(email).toHaveValue("test@test.com");
    
    const passwordInputs =  await screen.findAllByPlaceholderText(/password/i);
    const password = passwordInputs[0];
    await user.type(password, "testtest");
    expect(password).toHaveValue("testtest");

    const repeatedPassword = passwordInputs[1];
    await user.type(repeatedPassword, "testtest");
    expect(repeatedPassword).toHaveValue("testtest");

    const button = await screen.findByRole('button');
    await user.click(button);

    const loginTitle = await screen.findByRole("heading");
    expect(loginTitle).toBeInTheDocument();
  });

  test('Error messages if inputs are empty', async () => {
    const user = userEvent.setup();
    render(component);

    const button = await screen.findByRole('button');
    await user.click(button);

    const emailErrorMessage = await screen.findByText("Invalid email");
    expect(emailErrorMessage).toBeInTheDocument();
    
    const passwordErrorMessage = await screen.findAllByText("Can't be empty");
    expect(passwordErrorMessage).toHaveLength(2);
  });

  test('Error messages if passwords inputs are empty', async () => {
    const user = userEvent.setup();
    render(component);

    const email = await screen.findByRole('textbox');
    await user.type(email, "test@test.com");

    const button = await screen.findByRole('button');
    await user.click(button);
    
    const passwordErrorMessage = await screen.findAllByText("Can't be empty");
    expect(passwordErrorMessage).toHaveLength(2);
  });

  test('Error message if passwords are different', async () => {
    const user = userEvent.setup();
    render(component);

    const passwordInputs = await screen.findAllByPlaceholderText(/password/i);
    const password = passwordInputs[0];
    await user.type(password, "testtest");

    const repeatedPassword = passwordInputs[1];
    await user.type(repeatedPassword, "testtests");

    const button = await screen.findByRole('button');
    await user.click(button);

    const errorMessage = await screen.findByText("Passwords do not match");

    expect(errorMessage).toBeInTheDocument();
  });

   test('User can login if he already has an account', async () => {
    const user = userEvent.setup();
    render(component)

    const link = await screen.findByRole('link');
    await user.click(link);

    const loginTitle = await screen.findByRole("heading");
    expect(loginTitle).toBeInTheDocument();
  });
});