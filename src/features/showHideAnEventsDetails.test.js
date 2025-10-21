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

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  const getAllEvents = () => screen.queryAllByTestId('event');

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppComponent;
    let button;
    
    given('the user is viewing the main page with events', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const events = getAllEvents();
        expect(events[0]).toBeTruthy();
      });
    });

    when(/^the user clicks on the "(.*)" button for an event$/, async (arg0) => {
      const user = userEvent.setup();
      button = screen.getAllByText('show details')[0];
      await user.click(button);
    });

    then('the event details should be visible', () => {
      const eventDetails = screen.getByTestId('event-details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppComponent;
    let hideButton;
    
    given('the user is viewing an event with its details expanded', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const events = getAllEvents();
        expect(events[0]).toBeTruthy();
      });
      
      const user = userEvent.setup();
      const showButton = screen.getAllByText('show details')[0];
      await user.click(showButton);
      expect(screen.getByTestId('event-details')).toBeInTheDocument();
    });

    when(/^the user clicks on the "(.*)" button$/, async (arg0) => {
      const user = userEvent.setup();
      hideButton = screen.getByText('hide details');
      await user.click(hideButton);
    });

    then('the event details should be hidden', () => {
      const eventDetails = screen.queryByTestId('event-details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});
