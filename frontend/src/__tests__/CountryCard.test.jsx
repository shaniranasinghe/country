import { render, screen } from '@testing-library/react';
import CountryCard from '../components/CountryCard';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';


const mockCountry = {
  cca3: 'LKA',
  name: { common: 'Sri Lanka' },
  capital: ['Sri Jayawardenepura Kotte'],
  region: 'Asia',
  population: 21803000,
  flags: { png: 'https://flagcdn.com/w320/lk.png' }
};

test('renders country data correctly', () => {
  render(
    <MemoryRouter>
      <CountryCard country={mockCountry} />
    </MemoryRouter>
  );

  expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
  expect(screen.getAllByTestId('region-badge')[0]).toHaveTextContent('Asia');
  expect(screen.getAllByTestId('region-detail')[0]).toHaveTextContent('Asia');
  expect(screen.getByText(/Sri Jayawardenepura Kotte/)).toBeInTheDocument();
});
