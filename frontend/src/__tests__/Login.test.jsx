import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

// Mock the UserContext
import { useUser } from '../contexts/UserContext';

jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));


beforeEach(() => {
  // Mock localStorage
  const mockLocalStorage = {
    getItem: jest.fn((key) => {
      if (key === 'users') {
        return JSON.stringify({
          Sana: { password: '1234', favorites: [] },
        });
      }
      return null;
    }),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

test('calls login with username when form is submitted', () => {
  const mockLogin = jest.fn();
  useUser.mockReturnValue({ login: mockLogin });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'Sana' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: '1234' },
  });

  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith('Sana');
});
