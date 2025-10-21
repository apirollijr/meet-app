import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock both chart components
jest.mock('../components/CityEventsChart', () => {
  return function MockCityEventsChart() { return <div>Mock City Chart</div>; };
});

jest.mock('../components/EventGenresChart', () => {
  return function MockEventGenresChart() { return <div>Mock Genres Chart</div>; };
});

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('A default number of events is shown when the user has not specified a number', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the main page', () => {
      AppComponent = render(<App />);
    });

    when('the user has not specified a number of events to display', () => {
      // No action needed - default state
    });

    then(/^(\d+) events should be displayed by default$/, async (arg0) => {
      await waitFor(() => {
        const EventListDOM = AppComponent.container.querySelector('[data-testid="event-list"]');
        const allRenderedEvents = within(EventListDOM).queryAllByTestId('event');
        expect(allRenderedEvents).toHaveLength(parseInt(arg0));
      }, { timeout: 3000 });
    });
  });

  test('User changes the number of events shown', ({ given, when, then }) => {
    let AppComponent;
    let input;
    
    given('the user is viewing the events list', () => {
      AppComponent = render(<App />);
    });

    when('the user changes the number in the "Number of Events" input', async () => {
      await waitFor(() => {
        input = AppComponent.container.querySelector('[data-testid="number-of-events"]');
        expect(input).toBeInTheDocument();
      });
      
      const user = userEvent.setup();
      await user.clear(input);
      await user.type(input, '10');
    });

    then('the events list should update to show that many events', async () => {
      await waitFor(() => {
        const EventListDOM = AppComponent.container.querySelector('[data-testid="event-list"]');
        const allRenderedEvents = within(EventListDOM).queryAllByTestId('event');
        expect(allRenderedEvents).toHaveLength(10);
      }, { timeout: 3000 });
    });
  });
});
