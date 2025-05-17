import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { useUser } from '../contexts/UserContext';

jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

test('renders username and handles logout', () => {
  const mockLogout = jest.fn();
  useUser.mockReturnValue({ user: { username: 'Sana' }, logout: mockLogout });

  render(<Dashboard />);

  expect(screen.getByText(/welcome, Sana/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/logout/i));
  expect(mockLogout).toHaveBeenCalled();
});
