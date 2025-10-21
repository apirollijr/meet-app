import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

// Mock both chart components to avoid ResizeObserver issues
jest.mock('../src/components/CityEventsChart', () => {
  return function MockCityEventsChart({ events }) {
    return <div data-testid="city-events-chart">Mock Chart with {events?.length || 0} events</div>;
  };
});

jest.mock('../src/components/EventGenresChart', () => {
  return function MockEventGenresChart({ events }) {
    return <div data-testid="event-genres-chart">Mock Pie Chart with {events?.length || 0} events</div>;
  };
});

describe('<App /> component', () => {
  let AppDOM;
  
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', async () => {
    expect(AppDOM.querySelector('.event-list-section')).toBeInTheDocument();
    
    // Wait for events to load
    await waitFor(() => {
      const EventListItems = AppDOM.querySelectorAll('[data-testid="event"]');
      expect(EventListItems.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  test('render city search', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('integration tests: Number of Events with App & EventList', () => {
  test('changes the number of rendered events when user changes the "number of events" input', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for initial events to load
    await waitFor(() => {
      const initialItems = screen.queryAllByTestId('event');
      expect(initialItems.length).toBeGreaterThan(0);
    }, { timeout: 3000 });

    const initialItems = screen.queryAllByTestId('event');
    expect(initialItems.length).toBe(32);

    // Wait for the number input to be available
    await waitFor(() => {
      expect(screen.getByTestId('number-of-events')).toBeInTheDocument();
    });

    const input = screen.getByTestId('number-of-events');
    await user.clear(input);
    await user.type(input, '10');

    // Wait for the events list to update
    await waitFor(() => {
      const updatedItems = screen.queryAllByTestId('event');
      expect(updatedItems.length).toBe(10);
    }, { timeout: 5000 });
  });
});
