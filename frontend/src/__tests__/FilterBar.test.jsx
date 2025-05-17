import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';
import React from 'react';

test('triggers filter changes correctly', () => {
  const mockRegionChange = jest.fn();
  const mockLanguageChange = jest.fn();
  
  render(
    <FilterBar 
      onRegionChange={mockRegionChange}
      onLanguageChange={mockLanguageChange}
      regions={['Asia', 'Europe']}
      languages={['Sinhala', 'Tamil']}
    />
  );

  // Get all combobox elements (selects)
  const selects = screen.getAllByRole('combobox');
  
  // First select is Region filter
  fireEvent.change(selects[0], { target: { value: 'Asia' } });
  // Second select is Language filter
  fireEvent.change(selects[1], { target: { value: 'Sinhala' } });

  expect(mockRegionChange).toHaveBeenCalledWith('Asia');
  expect(mockLanguageChange).toHaveBeenCalledWith('Sinhala');
});