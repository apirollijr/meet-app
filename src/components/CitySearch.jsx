import React, { useEffect, useState } from 'react';
import { getEvents } from '../api.js';

export default function CitySearch({ value, onChange }) {
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await getEvents({ location: 'all', pageSize: 200 });
      const uniq = Array.from(new Set(data.map(e => e.location))).sort();
      if (active) setAllLocations(uniq);
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="city-search">
      <input
        aria-label="City"
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        list="city-options"
      />
      <datalist id="city-options">
        {allLocations.map(loc => <option key={loc} value={loc} />)}
      </datalist>
    </div>
  );
}
