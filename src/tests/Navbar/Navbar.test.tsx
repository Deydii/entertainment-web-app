import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from "../../components/Navbar";
import Login from "../../routes/login";

describe('Navbar component', () => {

  const routes = [
    {
      path: "/",
      element: <Navbar />
    },
    {
      path: "login",
      element: <Login />
    }
  ]

  test('Icon color change when it\'s active', async () => {

    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/']})}/>)

    const links = screen.getAllByRole('link');  
    const linkIsActive = links[0];
    expect(linkIsActive).toHaveClass("fill-white");

    const linkIsNotActive = links[1];
    expect(linkIsNotActive).toHaveClass("fill-[#5A698F]");
  });

  test('User is sign out after sign out button on click', async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/']})}/>)

    const user = userEvent.setup();
    const button = screen.getByRole('button');
    await user.click(button);
    const loginTitle = screen.getByRole('heading');
    expect(loginTitle).toBeInTheDocument();
  });
});

