import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../src/components/Event';
import { getEvents } from '../src/api';

let allEvents;

beforeAll(async () => {
  allEvents = await getEvents();
});

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

test('renders show details button', () => {
  render(<Event event={allEvents[0]} />);
  expect(
    screen.getByRole('button', { name: /show details/i })
  ).toBeInTheDocument();
});

test('details are hidden by default', async () => {
  render(<Event event={allEvents[0]} />);
  // details section should not be in the document initially
  expect(screen.queryByText(allEvents[0].description)).not.toBeInTheDocument();
});

test('shows details when the button is clicked', () => {
  render(<Event event={allEvents[0]} />);
  const button = screen.getByRole('button', { name: /show details/i });
  fireEvent.click(button);

  // just check part of the description instead of the whole text
  expect(screen.getByText(/have you wondered/i)).toBeInTheDocument();
});

test('hides details when the button is clicked again', () => {
  render(<Event event={allEvents[0]} />);
  const button = screen.getByRole('button', { name: /show details/i });
  fireEvent.click(button); // show
  fireEvent.click(button); // hide

  expect(screen.queryByText(/have you wondered/i)).not.toBeInTheDocument();
});
