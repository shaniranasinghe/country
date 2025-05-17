import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import React from 'react';


test('calls onSearch when typing', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Sri Lanka' } });

  expect(mockSearch).toHaveBeenCalledWith('Sri Lanka');
});
