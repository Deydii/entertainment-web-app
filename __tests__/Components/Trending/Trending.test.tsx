import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TrendingCard from "../../../src/components/Trending";

describe('Trending card component', () => {

  const data = {
    name: "The Last of Us",
    first_air_date: "2023-01-15",
    backdrop_path: "https://api.themoviedb.org/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
    media_type: "tv",
    id: 1234556,
    isBookmarked: false
  };

    const component =
      <TrendingCard 
        name={data.name}
        first_air_date={data.first_air_date}
        backdrop_path={data.backdrop_path}
        media_type={data.media_type}
        id={data.id}
        isBookmarked={data.isBookmarked}
      />

test('It should render trending cards', async () => {
  render(component);

  const name = await screen.findByText(/the last of us/i);
  expect(name).toBeInTheDocument();
});

test('It should render series icon', async () => {
  render(component);

  const images = await screen.findAllByRole('img');
  const iconTv = images[3];
  expect(iconTv).toHaveAttribute("src", "/images/icons/icon-category-tv.svg");

  const media = await screen.findByText(/tv series/i);
  expect(media).toBeInTheDocument();
});

test('SVG is different when user add or remove bookmarked', async () => {
  const user = userEvent.setup();

  const { rerender } = render(
    <TrendingCard 
      name={data.name}
      first_air_date={data.first_air_date}
      backdrop_path={data.backdrop_path}
      media_type={data.media_type}
      id={data.id}
      isBookmarked={false}
    />
  );

  const svgDiv = await screen.findByTestId('svg');
  const imagesComponent = await screen.findAllByRole('img');
  const bookmarkedIconComponent = imagesComponent[2];
  expect(bookmarkedIconComponent).toHaveClass("stroke-white group-hover:stroke-blue-900");

  await user.click(svgDiv);

  rerender(      
    <TrendingCard 
      name={data.name}
      first_air_date={data.first_air_date}
      backdrop_path={data.backdrop_path}
      media_type={data.media_type}
      id={data.id}
      isBookmarked={true}
    />
  );
  
  const images = await screen.findAllByRole('img');
  const bookmarkedIcon = images[3];
  expect(bookmarkedIcon).not.toHaveClass("stroke-white group-hover:stroke-blue-900");
});
})

