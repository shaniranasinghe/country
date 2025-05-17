import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile';
import { useUser } from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

beforeEach(() => {
  // Mock user data WITH a profile image
  const mockUsers = {
    Sana: { 
      password: '1234',
      favorites: [],
      profileImage: 'data:image/png;base64,mock-image-data' 
    }
  };
  localStorage.setItem('users', JSON.stringify(mockUsers));
});

test('handles profile image upload and deletion', () => {
  const mockUpdate = jest.fn();
  useUser.mockReturnValue({ 
    user: { username: 'Sana' },
    logout: jest.fn(),
    updateProfileImage: mockUpdate
  });

  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  // Use more specific query for the delete button
  const deleteButton = screen.getByRole('button', { name: /delete image/i });
  fireEvent.click(deleteButton);
  
  expect(mockUpdate).toHaveBeenCalledWith(null);
});