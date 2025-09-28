import React, { useState } from "react";

export default function Event({ event }) {
  const [open, setOpen] = useState(false);
  return (
    <article data-testid="event" className="event-card">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{new Date(event.created || event.start?.dateTime || event.start?.date).toISOString()}</p>
      <button onClick={() => setOpen((v) => !v)}>{open ? "Hide details" : "Show details"}</button>
      {open && event.description && <p className="event-desc">{event.description}</p>}
    </article>
  );
}
