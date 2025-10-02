import React from 'react';
import { render, screen } from '@testing-library/react';
import Event from '../src/components/Event';

const allEvents = [
  {
    id: 'a1',
    summary: 'Sample Event',
    created: '2025-10-01T12:00:00Z',
    location: 'Berlin, Germany',
    description: 'Details here'
  }
];

test('renders event title', () => {
  render(<Event event={allEvents[0]} />);
  expect(screen.queryByText(allEvents[0].summary)).toBeInTheDocument();
});

test('renders event start time', () => {
  render(<Event event={allEvents[0]} />);
  expect(screen.queryByText(allEvents[0].created)).toBeInTheDocument();
});

test('renders event location', () => {
  render(<Event event={allEvents[0]} />);
  expect(screen.queryByText(allEvents[0].location)).toBeInTheDocument();
});
