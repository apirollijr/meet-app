import React, { useState } from "react";

export default function Event({ event }) {
  const [open, setOpen] = useState(false);
  return (
    <article data-testid="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button onClick={() => setOpen((v) => !v)}>
        {open ? "Hide Details" : "Show Details"}
      </button>
      {open && (
        <div className="details">
          <p>{event.description}</p>
        </div>
      )}
    </article>
  );
}
