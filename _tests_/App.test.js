// src/__tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';



describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })


  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });


  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('renders NumberOfEvents component', () => {
  const { container } = render(<App />);
  const numberOfEventsComponent = container.querySelector('#number-of-events');
  expect(numberOfEventsComponent).toBeInTheDocument();
});


});