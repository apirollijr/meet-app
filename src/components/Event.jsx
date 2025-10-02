import React, { useState } from 'react';

export default function Event({ event = {} }) {
  const [open, setOpen] = useState(false);
  const title = event.summary || event.title || 'Untitled';
  const time = event.created || event.start?.dateTime || event.start || '';
  const location = event.location || '';

  return (
    <article className="event">
      <h3>{title}</h3>
      {time && <p>{time}</p>}
      {location && <p>{location}</p>}
      <button
        type="button"
        data-testid="toggle-details"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        {open ? 'Hide details' : 'Show details'}
      </button>
      {open && (
        <div data-testid="event-details">
          <p>{event.description || 'No details.'}</p>
        </div>
      )}
    </article>
  );
}
