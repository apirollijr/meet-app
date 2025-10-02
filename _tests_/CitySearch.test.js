import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../src/components/CitySearch';
import { getEvents } from '../src/api';

jest.mock('../src/api', () => {
  const data = Array.from({ length: 6 }).map((_, i) => ({
    id: `e-${i + 1}`,
    summary: `Event ${i + 1}`,
    location: i % 2 ? 'Berlin, Germany' : 'London, UK',
    created: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  }));
  return {
    __esModule: true,
    getEvents: jest.fn().mockResolvedValue(data),
    extractLocations: jest.fn(list => {
      const s = new Set(list.map(e => e.location));
      return Array.from(s).sort();
    }),
  };
});

test('renders text input', async () => {
  render(<CitySearch />);
  const cityTextBox = await screen.findByRole('textbox');
  expect(cityTextBox).toBeInTheDocument();
  expect(cityTextBox).toHaveClass('city');
});

test('renders a list of suggestions when city textbox gains focus', async () => {
  const user = userEvent.setup();
  render(<CitySearch />);
  const cityTextBox = await screen.findByRole('textbox');
  await user.click(cityTextBox);
  await waitFor(() => expect(getEvents).toHaveBeenCalled());
  const suggestionList = await screen.findByRole('list');
  expect(suggestionList).toBeInTheDocument();
  expect(suggestionList).toHaveClass('suggestions');
});

test('updates list of suggestions correctly when user types in city textbox', async () => {
  const user = userEvent.setup();
  render(<CitySearch />);
  const cityTextBox = await screen.findByRole('textbox');
  await user.type(cityTextBox, 'Berlin');
  const items = await screen.findAllByRole('button', { name: /berlin/i });
  expect(items.length).toBeGreaterThan(0);
});

test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
  const user = userEvent.setup();
  render(<CitySearch />);
  const cityTextBox = await screen.findByRole('textbox');
  await user.type(cityTextBox, 'Lon');
  const londonBtn = await screen.findByRole('button', { name: /london, uk/i });
  await user.click(londonBtn);
  expect(cityTextBox).toHaveValue('London, UK');
});
