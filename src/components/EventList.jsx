import React from 'react';
import Event from './Event.jsx';

export default function EventList({ events = [] }) {
  return (
    <ul className="event-list">
      {events.map(ev => (
        <li key={ev.id || ev.link || ev.title} data-testid="event">
          <Event event={ev} />
        </li>
      ))}
    </ul>
  );
}
