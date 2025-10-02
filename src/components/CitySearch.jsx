import React, { useEffect, useState } from 'react';
import { getEvents, extractLocations } from '../api';

export default function CitySearch({ allLocations: propsLocations, onChange }) {
  const [query, setQuery] = useState('');
  const [allLocations, setAllLocations] = useState(propsLocations || []);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    if (propsLocations && propsLocations.length) {
      setAllLocations(propsLocations);
      return;
    }
    (async () => {
      const data = await getEvents({ location: 'all', pageSize: 200 });
      const uniq = extractLocations(data);
      if (active) setAllLocations(uniq);
    })();
    return () => {
      active = false;
    };
  }, [propsLocations]);

  useEffect(() => {
    const list = allLocations.filter(loc =>
      String(loc).toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(list);
  }, [query, allLocations]);

  return (
    <div>
      <input
        type="text"
        role="textbox"
        className="city"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => {
          const val = e.target.value;
          setQuery(val);
          onChange?.(val || 'all');
        }}
        placeholder="Search city"
      />
      {open && suggestions.length > 0 && (
        <ul role="list" className="suggestions">
          {suggestions.map((s, i) => (
            <li key={`${s}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  setQuery(s);
                  onChange?.(s);
                  setOpen(false);
                }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
