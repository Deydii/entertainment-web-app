import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Card from "../../../src/components/Card";

describe('Card component', () => {

  const data = {
    title: "Puss in Boots: The Last Wish",
    release_date: "2022-12-07",
    backdrop_path: "https://api.themoviedb.org/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
    id: 1234556,
    isBookmarked: false
    };

    const component =
      <Card 
        title={data.title}
        release_date={data.release_date}
        backdrop_path={data.backdrop_path}
        id={data.id}
        isBookmarked={data.isBookmarked}
      />

test('It should render cards', async () => {
  render(component);

  const title = await screen.findByText(/puss in boots: the last wish/i);
  expect(title).toBeInTheDocument();
});

test('It should render movies icon', async () => {
  render(component);

  const images = await screen.findAllByRole('img');
  const iconMovie = images[4];
  expect(iconMovie).toHaveAttribute("src", "/images/icons/icon-category-movie.svg");

  const media = await screen.findByText(/movie/i);
  expect(media).toBeInTheDocument();
});

test('SVG is different when user add or remove bookmarked', async () => {
  const user = userEvent.setup();

  const { rerender } = render(
    <Card 
      title={data.title}
      release_date={data.release_date}
      backdrop_path={data.backdrop_path}
      id={data.id}
      isBookmarked={false}
    />
  );

  const svgDiv = await screen.findByTestId('svg');
  const imagesComponent = await screen.findAllByRole('img');
  const bookmarkedIconComponent = imagesComponent[3];
  expect(bookmarkedIconComponent).toHaveClass("stroke-white group-hover:stroke-blue-900");

  await user.click(svgDiv);

  rerender(      
    <Card 
      title={data.title}
      release_date={data.release_date}
      backdrop_path={data.backdrop_path}
      id={data.id}
      isBookmarked={true}
    />
  );
  
  const images = await screen.findAllByRole('img');
  const bookmarkedIcon = images[3];
  expect(bookmarkedIcon).not.toHaveClass("stroke-white group-hover:stroke-blue-900");
});
})

