import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

const EVENT_SEL = '.event, .Event, .event-item, [data-testid="event"]';

const getEventCards = () =>
  (screen.queryAllByTestId('event').length
    ? screen.getAllByTestId('event')
    : Array.from(document.querySelectorAll(EVENT_SEL)));

const findCountInput = () =>
  screen.queryByTestId('number-of-events') ||
  screen.queryByRole('spinbutton') ||
  document.querySelector('#number-of-events, input[type="number"]');

defineFeature(feature, test => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  test('A default number of events is shown when the user has not specified a number', ({ given, when, then }) => {
    given('the app is loaded', async () => {});

    when('the list of events is displayed', async () => {
      await waitFor(() => {
        expect(getEventCards().length).toBeGreaterThan(0);
      });
    });

    then('the app shows the default number of events', async () => {
      const DEFAULT = Number(process.env.DEFAULT_EVENTS_COUNT || 32);
      await waitFor(() => {
        expect(getEventCards().length).toBeLessThanOrEqual(DEFAULT);
      });
    });
  });

  test('User changes the number of events shown', ({ given, when, then }) => {
    given('the app is loaded', async () => {
      await waitFor(() => expect(findCountInput()).toBeTruthy());
    });

    when(/^the user sets the number of events to "(\d+)"$/, async count => {
      const input = findCountInput();
      expect(input).toBeTruthy();
      await user.clear(input);
      await user.type(input, String(count));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    });

    then(/^up to "(\d+)" events are displayed$/, async count => {
      const expected = Number(count);
      await waitFor(() => {
        expect(getEventCards().length).toBeLessThanOrEqual(expected);
      }, { timeout: 3000 });
    });
  });
});
