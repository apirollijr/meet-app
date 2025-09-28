import React from "react";

export default function NumberOfEvents({ currentNOE, setCurrentNOE }) {
  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of events</label>
      <input
        id="number-of-events-input"
        aria-label="Number of events"
        type="number"
        min="1"
        value={currentNOE}
        onChange={(e) => {
          const v = Number(e.target.value || 1);
          setCurrentNOE(Number.isNaN(v) ? 1 : v);
        }}
      />
    </div>
  );
}
