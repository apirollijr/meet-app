import React, { useState, useEffect } from "react";

export default function NumberOfEvents({
  currentNOE = 32,
  setCurrentNOE, 
}) {
  const [value, setValue] = useState(String(currentNOE));

  
  useEffect(() => {
    setValue(String(currentNOE));
  }, [currentNOE]);

  const handleChange = (e) => {
    const next = e.target.value;        
    setValue(next);
    if (setCurrentNOE) {
      
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
