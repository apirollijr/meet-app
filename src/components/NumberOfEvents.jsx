// filepath: c:\www\meet\src\components\NumberOfEvents.jsx
import React, { useState } from 'react';

export default function NumberOfEvents({ currentNOE, setCurrentNOE, setErrorAlert }) {
  const [numberOfEvents, setNumberOfEvents] = useState(currentNOE || 32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);

    if (isNaN(value) || value <= 0) {
      if (setErrorAlert) {
        setErrorAlert('Only positive numbers are allowed');
      }
    } else {
      if (setErrorAlert) {
        setErrorAlert('');
      }
      if (setCurrentNOE) {
        setCurrentNOE(value);
      }
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input" className="form-label fw-bold text-secondary mb-2">
        Number of Events:
      </label>
      <input
        type="number"
        id="number-of-events-input"
        className="form-control"
        value={numberOfEvents}
        onChange={handleInputChanged}
        data-testid="number-of-events"
      />
    </div>
  );
}