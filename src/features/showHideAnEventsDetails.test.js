import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

const getAllEvents = () =>
  (screen.queryAllByTestId('event').length
    ? screen.getAllByTestId('event')
    : Array.from(document.querySelectorAll('.event, .Event, .event-item')));

const getFirstEventParts = () => {
  const events = getAllEvents();
  expect(events.length).toBeGreaterThan(0);

  const first = events[0];
  const utils = within(first);

  const details =
    utils.queryByTestId('event-details') ??
    first.querySelector('.event-details, .Event-details');

  const toggleBtn =
    utils.queryByTestId('toggle-details') ??
    utils.queryByRole('button', { name: /details|show|hide/i }) ??
    first.querySelector('button');

  return { first, details, toggleBtn };
};

defineFeature(feature, test => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  test('Events are collapsed by default', ({ given, when, then }) => {
    given('the app is loaded', async () => {});

    when('the list of events is displayed', async () => {
      await waitFor(() => expect(getAllEvents().length).toBeGreaterThan(0));
    });

    then('each event’s details are hidden', async () => {
      const cards = getAllEvents();
      cards.forEach(card => {
        const details =
          within(card).queryByTestId('event-details') ??
          card.querySelector('.event-details, .Event-details');
        // Not rendered until open = hidden
        expect(details).toBeNull();
      });
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the app is loaded', async () => {
      await waitFor(() => expect(getAllEvents().length).toBeGreaterThan(0));
    });

    when('the user toggles the first event’s details', async () => {
      const { toggleBtn } = getFirstEventParts();
      expect(toggleBtn).toBeTruthy();
      await user.click(toggleBtn);
    });

    then('the first event’s details are visible', async () => {
      const { first } = getFirstEventParts();
      const details =
        within(first).queryByTestId('event-details') ??
        first.querySelector('.event-details, .Event-details');
      expect(details).not.toBeNull(); // presence = visible in this component
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the app is loaded', async () => {
      await waitFor(() => expect(getAllEvents().length).toBeGreaterThan(0));
    });

    given('the first event’s details are visible', async () => {
      const { toggleBtn } = getFirstEventParts();
      await user.click(toggleBtn); // open
    });

    when('the user toggles the first event’s details', async () => {
      const { toggleBtn } = getFirstEventParts();
      await user.click(toggleBtn); // close
    });

    then('the first event’s details are hidden', async () => {
      const { first } = getFirstEventParts();
      const details =
        within(first).queryByTestId('event-details') ??
        first.querySelector('.event-details, .Event-details');
      expect(details).toBeNull(); // not rendered when closed
    });
  });
});
