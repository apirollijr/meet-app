import React, { useState } from 'react';

export default function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  // Add defensive checks
  if (!event) {
    return <div>No event data available</div>;
  }

  return (
    <div data-testid="event" className="event">
      <h3>{event.summary || 'No title'}</h3>
      <p>{event.location || 'No location'}</p>
      <p>{event.created ? new Date(event.created).toUTCString() : 'No date'}</p>
      {showDetails && (
        <div data-testid="event-details" className="details">
          <h4>About event:</h4>
          <a href={event.htmlLink || '#'}>See details on Google Calendar</a>
          <p>{event.description || 'No description available'}</p>
        </div>
      )}
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'hide details' : 'show details'}
      </button>
    </div>
  );
}
