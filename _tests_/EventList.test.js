import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../src/components/EventList';
import { getEvents } from '../src/api';


describe('<EventList /> component', () => {
 let EventListComponent;
 beforeEach(() => {
   EventListComponent = render(<EventList />);
 })

 test('has an element with "list" role', () => {
   expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
 });

 test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
    // Count by data-testid instead of role to avoid Bootstrap wrapper duplication
    expect(EventListComponent.getAllByTestId("event")).toHaveLength(allEvents.length);
  });
});


