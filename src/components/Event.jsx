import React, { useState } from 'react';

export default function Event({ event = {} }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="event">
      <h3>{event.title || ''}</h3>
      <p>{event.location || ''}</p>

      <button
        type="button"
        className="toggle-details"
        data-testid="toggle-details"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {open ? 'Hide details' : 'Show details'}
      </button>

      {open && (
        <div className="event-details" data-testid="event-details">
          <p>{event.description || 'Event details…'}</p>
        </div>
      )}
    </article>
  );
}
