import React from 'react'; // Add this import
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

test('shows user menu and handles logout', () => {
  const mockLogout = jest.fn();
  useUser.mockReturnValue({ 
    user: { username: 'Sana', profileImage: null },
    logout: mockLogout 
  });

  render(
    <BrowserRouter>
      <Header onToggleFavorites={jest.fn()} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/sana/i));
  fireEvent.click(screen.getByText(/logout/i));
  expect(mockLogout).toHaveBeenCalled();
});

test('toggles favorites view', () => {
  const mockToggle = jest.fn();
  render(
    <BrowserRouter>
      <Header onToggleFavorites={mockToggle} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /favorites/i }));
  expect(mockToggle).toHaveBeenCalledWith(true);
});