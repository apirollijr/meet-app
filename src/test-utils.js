import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

export const renderWithAct = async (component) => {
  let result;
  await act(async () => {
    result = render(component);
  });
  return result;
};

export const waitForAct = async (callback) => {
  await act(async () => {
    await callback();
  });
};