import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteCountries from '../components/FavoriteCountries';
import React from 'react';

beforeEach(() => {
  const mockUsers = {
    Sana: { favorites: ['LKA', 'IND'] }
  };
  localStorage.setItem('users', JSON.stringify(mockUsers));
});

test('displays and manages favorites', () => {
  render(<FavoriteCountries username="Sana" />);
  
  expect(screen.getByText(/LKA/)).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(screen.queryByText(/LKA/)).not.toBeInTheDocument();
});