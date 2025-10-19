import React, { useState } from 'react';

export default function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="event" data-testid="event">
      <h3>{event.summary || event.title}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button
        type="button"
        data-testid="toggle-details"
        aria-expanded={showDetails}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails && (
        <div className="event-details" data-testid="event-details">
          <p>{event.description}</p>
        </div>
      )}
    </article>
  );
}
