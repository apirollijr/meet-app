// src/setupTests.js

import '@testing-library/jest-dom';

// Global ResizeObserver mock
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Enhanced console suppression
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('Warning:') ||
       message.includes('Error: Uncaught') ||
       message.includes('ResizeObserver') ||
       message.includes('The above error occurred') ||
       message.includes('Consider adding an error boundary') ||
       message.includes('TypeError') ||
       message.includes('ReferenceError') ||
       message.includes('width(-1)') ||
       message.includes('height(-1)'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('width(-1)') ||
       message.includes('height(-1)') ||
       message.includes('chart should be greater than 0'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test timeout
jest.setTimeout(10000);
