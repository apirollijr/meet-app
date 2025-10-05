import React from 'react';
import Event from './Event.jsx';

export default function EventList({ events }) {
  return (
    <div className="event-list">
      {events.map(event => (
        <div className="event-card" key={event.id}>
          {/* Render event details here */}
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.location}</p>
          {/* ...other event details... */}
        </div>
      ))}
    </div>
  );
}
