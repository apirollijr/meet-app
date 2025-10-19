// filepath: c:\www\meet\src\components\NumberOfEvents.jsx
import React, { useState, useEffect } from 'react';

export default function NumberOfEvents({ value, onChange, setErrorAlert }) {
  const [internalValue, setInternalValue] = useState(value || 32);
  
  // Update internal value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const numValue = Number(newValue);
    
    // Always update the display value
    setInternalValue(newValue);
    
    // Call onChange for valid numbers
    if (onChange && numValue > 0 && !isNaN(numValue)) {
      onChange(numValue);
    }
    
    // Handle validation alerts
    if (setErrorAlert) {
      if (newValue === '' || isNaN(numValue) || numValue <= 0) {
        setErrorAlert("Please enter a valid positive number");
      } else {
        setErrorAlert("");
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        className="form-control"
        data-testid="number-of-events"
        id="number-of-events"
        min="1"
        placeholder="Number of events"
        aria-label="Number of events"
        value={internalValue}
        onChange={handleChange}
      />
    </div>
  );
}