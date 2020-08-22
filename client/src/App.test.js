import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders The landing page', () => {
  const { getByText } = render(<App />);
  const headingParagraph = getByText(/Explore Best Places In City/i);
  expect(headingParagraph).toBeInTheDocument();
});

test('renders The search button', () => {
  const { getByText } = render(<App />);
  const searchBtn = getByText(/Search/i)
  expect(searchBtn).toBeInTheDocument();
});