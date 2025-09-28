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
          const v = e.target.value;
          setCurrentNOE(v === "" ? "" : Math.max(1, Number(v)));
        }}
        onBlur={(e) => {
          if (e.target.value === "") setCurrentNOE(1);
        }}
      />
    </div>
  );
}
