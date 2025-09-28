import React from "react";
import Event from "./Event";

export default function EventList({ events = [] }) {
  return (
    <ul id="event-list" role="list">
      {events.map((e, i) => (
        <li key={e.id ?? i} role="listitem">
          <Event event={e} />
        </li>
      ))}
    </ul>
  );
}
