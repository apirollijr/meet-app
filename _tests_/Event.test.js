import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../src/components/Event';
import { getEvents } from '../src/api';

describe('<Event /> component', () => {
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
    const formattedDate = new Date(allEvents[0].created).toUTCString();
    expect(screen.queryByText(formattedDate)).toBeInTheDocument();
  });

  test('renders event location', () => {
    render(<Event event={allEvents[0]} />);
    expect(screen.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    render(<Event event={allEvents[0]} />);
    expect(screen.queryByText('show details')).toBeInTheDocument();
  });

  test('by default, event details section should be hidden', () => {
    render(<Event event={allEvents[0]} />);
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
  });

  test('shows the details section when the user clicks on the "show details" button', async () => {
    const user = userEvent.setup();
    render(<Event event={allEvents[0]} />);

    const showDetailsButton = screen.queryByText('show details');
    await user.click(showDetailsButton);

    expect(screen.queryByTestId('event-details')).toBeInTheDocument();
  });

  test('hides the details section when the user clicks on the "hide details" button', async () => {
    const user = userEvent.setup();
    render(<Event event={allEvents[0]} />);

    const showDetailsButton = screen.queryByText('show details');
    await user.click(showDetailsButton);
    expect(screen.queryByTestId('event-details')).toBeInTheDocument();

    const hideDetailsButton = screen.queryByText('hide details');
    await user.click(hideDetailsButton);
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
  });
});
