import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Card from "../../components/Card";

describe('Card component', () => {

  const data = {
      title: "Bottom Gear",
      thumbnail: {
       regular: {
         small:"/assets/thumbnails/bottom-gear/regular/small.jpg",
          medium: "/assets/thumbnails/bottom-gear/regular/medium.jpg",
          large: "/assets/thumbnails/bottom-gear/regular/large.jpg"
        }
      },
      year: 2021,
      category: "Movie",
      rating: "PG",
      isBookmarked: false,
    };

    const component =
      <Card 
        title={data.title}
        thumbnail={data.thumbnail.regular}
        year={data.year}
        category={data.category}
        rating={data.rating}
        isBookmarked={data.isBookmarked}
      />

test('It should render cards', async () => {
  render(component);

  const title = await screen.findByText(/bottom Gear/i);
  expect(title).toBeInTheDocument();
});

test('SVG is different when user add or remove bookmarked', async () => {
  const user = userEvent.setup();

  const { rerender } = render(
    <Card 
      title={data.title}
      thumbnail={data.thumbnail.regular}
      year={data.year}
      category={data.category}
      rating={data.rating}
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
      thumbnail={data.thumbnail.regular}
      year={data.year}
      category={data.category}
      rating={data.rating}
      isBookmarked={true}
    />
  );
  
  const images = await screen.findAllByRole('img');
  const bookmarkedIcon = images[3];
  expect(bookmarkedIcon).not.toHaveClass("stroke-white group-hover:stroke-blue-900");
});
})

