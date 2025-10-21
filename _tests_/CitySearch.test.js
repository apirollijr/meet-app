import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../src/components/CitySearch';
import { getEvents, extractLocations } from '../src/api';

// Mock the chart component to avoid ResizeObserver issues
jest.mock('../src/components/CityEventsChart', () => {
  return function MockCityEventsChart() {
    return <div data-testid="mock-chart">Mock Chart</div>;
  };
});

jest.mock('../src/api');

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  const mockSetInfoAlert = jest.fn();
  const mockSetCurrentCity = jest.fn();
  
  // Mock data with the cities the tests expect
  const mockEvents = [
    { location: 'Berlin, Germany' },
    { location: 'London, UK' },
    { location: 'New York, NY, USA' }
  ];
  
  const mockLocations = ['Berlin, Germany', 'London, UK', 'New York, NY, USA'];

  beforeEach(() => {
    getEvents.mockResolvedValue(mockEvents);
    extractLocations.mockReturnValue(mockLocations);
    mockSetInfoAlert.mockClear();
    mockSetCurrentCity.mockClear();
    
    CitySearchComponent = render(
      <CitySearch 
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = await screen.findByRole('textbox');
    await user.click(cityTextBox);
    
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
    expect(suggestionList).toHaveClass('list-unstyled');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = await screen.findByRole('textbox');
    
    await user.clear(cityTextBox);
    await user.type(cityTextBox, 'Berlin');
    
    // Wait for suggestions to appear and then find the button
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
    
    const berlinButton = await screen.findByText('Berlin, Germany');
    expect(berlinButton).toBeInTheDocument();
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const cityTextBox = await screen.findByRole('textbox');
    
    await user.clear(cityTextBox);
    await user.type(cityTextBox, 'Lon');
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
    
    const londonBtn = await screen.findByText('London, UK');
    expect(londonBtn).toBeInTheDocument();
    
    await user.click(londonBtn);
    expect(cityTextBox).toHaveValue('London, UK');
  });
});
