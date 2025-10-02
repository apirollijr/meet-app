import React from 'react';

export default function NumberOfEvents({ value = 32, onChange }) {
  // Normalize to a positive integer and notify parent
  const notify = (raw) => {
    const n = Math.max(1, Number(raw) || 1);
    onChange?.(n);
  };

  const handleChange = (e) => notify(e.target.value);
  const handleInput  = (e) => notify(e.target.value); // important for jsdom/user-event
  const handleBlur   = (e) => notify(e.target.value);

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events">Number of events</label>
      <input
        id="number-of-events"
        data-testid="number-of-events"
        type="number"
        min={1}
        /* Use uncontrolled input so the DOM value reflects user typing immediately */
        defaultValue={value}
        onInput={handleInput}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
