import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Navbar from "../../src/components/Navbar";

const component = 
  <MemoryRouterProvider url="/">
    <Navbar />
  </MemoryRouterProvider>

describe('Navbar component', () => {

  test('Icon color change when it\'s active', async () => {

    render(component);

    const links = await screen.findAllByRole('link');  
    const linkIsActive = links[0];
    expect(linkIsActive).toHaveClass("fill-white");

    const linkIsNotActive = links[1];
    expect(linkIsNotActive).toHaveClass("fill-[#5A698F]");
  });

  test('User is sign out after button click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouterProvider>
        <Navbar />
      </MemoryRouterProvider>
    )

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockRouter.asPath).toEqual('/login');
  });
});

