import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

jest.mock('../src/api', () => {
  const data = Array.from({ length: 50 }).map((_, i) => ({
    id: `e-${i + 1}`,
    summary: `Event ${i + 1}`,
    title: `Event ${i + 1}`,
    location: i % 2 ? 'Berlin, Germany' : 'London, UK',
    description: `Description ${i + 1}`,
    created: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  }));
  return {
    __esModule: true,
    getEvents: jest.fn().mockResolvedValue(data),
    extractLocations: jest.fn(list => {
      const set = new Set(list.map(e => e.location));
      return Array.from(set).sort();
    }),
  };
});

describe('integration tests: Number of Events with App & EventList', () => {
  test("changes the number of rendered events when user changes the 'number of events' input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const initialItems = await screen.findAllByTestId('event');
    expect(initialItems.length).toBe(32);

    const input = screen.getByTestId('number-of-events');
    await user.clear(input);
    await user.type(input, '10');

    await waitFor(async () => {
      const items = await screen.findAllByTestId('event');
      expect(items.length).toBe(10);
    });
  });
});
