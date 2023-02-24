import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SearchBar from "../../components/SearchBar";

describe('Search bar component', () => {

  test('User can use the search bar to search a show', async () => {
    const user = userEvent.setup();
    render( <SearchBar />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'earth');
    expect(input).toHaveValue('earth');
  });
});