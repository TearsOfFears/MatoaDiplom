import { ProductsShow } from "./ProductsShow";

import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
  render(<ProductsShow />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
