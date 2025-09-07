// src/components/Event.jsx
import React, { useState } from "react";

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="details">
          <p>{event.description}</p>
        </div>
      )}
    </li>
  );
}

export default Event;
