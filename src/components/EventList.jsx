import React from "react";
import Event from "./Event";

export default function EventList({ events }) {
  return (
    <ul id="event-list" role="list">
      {events.map((event) => (
        <li key={event.id} role="listitem">
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
}
