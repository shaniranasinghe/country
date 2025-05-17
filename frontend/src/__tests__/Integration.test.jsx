import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../services/api';

jest.mock('../services/api');
jest.mock('../contexts/UserContext', () => ({
  UserProvider: ({ children }) => <div>{children}</div>,
  useUser: () => ({
    user: { name: 'Test User', password: '1234' },
    logout: jest.fn(),
  }),
}));

const mockCountries = [
  {
    cca3: 'LKA',
    name: { common: 'Sri Lanka' },
    capital: ['Sri Jayawardenepura Kotte'],
    region: 'Asia',
    population: 21803000,
    flags: { png: 'https://flagcdn.com/w320/lk.png' },
    languages: { sin: 'Sinhala', tam: 'Tamil' },
  },
  {
    cca3: 'IND',
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    population: 1400000000,
    flags: { png: 'https://flagcdn.com/w320/in.png' },
    languages: { hin: 'Hindi', eng: 'English' },
  },
];

describe('Home Page Integration Test', () => {
  beforeEach(() => {
    api.getAllCountries.mockResolvedValue(mockCountries);
  });

  test('displays countries and filters them based on search and region', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  
    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('India')).toBeInTheDocument();
    });
  
    // Search for "Sri Lanka"
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'Sri Lanka' } });
  
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.queryByText('India')).not.toBeInTheDocument();
    });
  
    // Clear search and filter by region "Asia"
    fireEvent.change(searchInput, { target: { value: '' } });
    const regionFilter = screen.getByText(/filter by region/i).closest('select');
    fireEvent.change(regionFilter, { target: { value: 'Asia' } });
  
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('India')).toBeInTheDocument();
    });
  });
});