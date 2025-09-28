import React, { useState, useEffect } from "react";

export default function NumberOfEvents({
  currentNOE = 32,
  setCurrentNOE, // optional
}) {
  const [value, setValue] = useState(String(currentNOE));

  // keep local state in sync if parent changes prop
  useEffect(() => {
    setValue(String(currentNOE));
  }, [currentNOE]);

  const handleChange = (e) => {
    const next = e.target.value;        // keep as string for the tests
    setValue(next);
    if (setCurrentNOE) {
      // if parent provided a setter, notify it with a sane number (>=1)
      const n = Math.max(1, parseInt(next || "0", 10) || 1);
      setCurrentNOE(n);
    }
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of events</label>
    <input
      id="number-of-events-input"
      aria-label="Number of events"
      type="number"
      min="1"
      value={currentNOE}
      onChange={(e) => setCurrentNOE(Number(e.target.value) || 0)}
    />


    </div>
  );
}
