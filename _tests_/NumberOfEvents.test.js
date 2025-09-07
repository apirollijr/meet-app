import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../src/components/NumberOfEvents';

test('renders textbox input', () => {
  render(<NumberOfEvents />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('default value is 32', () => {
  render(<NumberOfEvents />);
  expect(screen.getByRole('textbox')).toHaveValue("32"); 
});

test('user can change value of textbox', async () => {
  const user = userEvent.setup();
  render(<NumberOfEvents />);
  const input = screen.getByRole('textbox');

  await user.clear(input);
  await user.type(input, '10');

  expect(input).toHaveValue("10"); 
});
