import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CountryDetail from '../pages/CountryDetail';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../services/api';

jest.mock('../services/api');

jest.mock('../contexts/UserContext', () => ({
  useUser: () => ({
    user: { username: 'testuser', favorites: [] },
    logout: jest.fn(),
  }),
}));

const mockCountry = {
  cca3: 'LKA',
  name: { common: 'Sri Lanka', official: 'Democratic Socialist Republic of Sri Lanka' },
  capital: ['Sri Jayawardenepura Kotte'],
  region: 'Asia',
  subregion: 'Southern Asia',
  population: 21803000,
  flags: { svg: 'https://flagcdn.com/w320/lk.png' },
  languages: { sin: 'Sinhala', tam: 'Tamil' },
  timezones: ['UTC+05:30'],
  area: 65610,
  currencies: { LKR: { name: 'Sri Lankan rupee' } },
  latlng: [7.8731, 80.7718],
};

describe('CountryDetail Component', () => {
  beforeEach(() => {
    api.getCountryByCode.mockResolvedValue([mockCountry]);
    localStorage.setItem(
      'users',
      JSON.stringify({
        testuser: { favorites: [] },
      })
    );
    localStorage.setItem('user', 'testuser');
  });

  test('displays country details correctly', async () => {
    render(
      <BrowserRouter>
        <CountryDetail />
      </BrowserRouter>
    );

    // Wait for the country details to load
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('Democratic Socialist Republic of Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('Sri Jayawardenepura Kotte')).toBeInTheDocument();
      expect(screen.getByText('Asia')).toBeInTheDocument();
      expect(screen.getByText('Southern Asia')).toBeInTheDocument();
      expect(screen.getByText('21,803,000')).toBeInTheDocument();
      expect(screen.getByText('Sinhala, Tamil')).toBeInTheDocument();
      expect(screen.getByText('UTC+05:30')).toBeInTheDocument();
      expect(screen.getByText('65,610 km²')).toBeInTheDocument();
      expect(screen.getByText('Sri Lankan rupee')).toBeInTheDocument();
    });
  });

  test('handles favorite toggle functionality', async () => {
    render(
      <BrowserRouter>
        <CountryDetail />
      </BrowserRouter>
    );

    // Wait for the country details to load
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    });

    // Simulate adding to favorites
    const toggleFavoriteButton = screen.getByText(/Add to Favorites/i);
    fireEvent.click(toggleFavoriteButton);

    // Verify that the country is added to favorites
    const updatedUser = JSON.parse(localStorage.getItem('users')).testuser;
    expect(updatedUser.favorites).toContain('LKA');
  });
});