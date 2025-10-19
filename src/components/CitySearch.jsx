import React, { useEffect, useState } from 'react';
import { getEvents, extractLocations } from '../api';

export default function CitySearch({ value, onChange, setInfoAlert }) {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await getEvents({ location: 'all', pageSize: 200 });
      const uniq = extractLocations(data);
      if (active) {
        setAllLocations(uniq);
        setSuggestions(uniq);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter locations based on the query
    const filteredLocations = allLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredLocations);

    // Show info alert when no city matches
    if (setInfoAlert) {
      let infoText = '';
      if (filteredLocations.length === 0) {
        infoText = 'We can not find the city you are looking for. Please try another city';
      }
      setInfoAlert(infoText);
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setSuggestions([]);
    if (onChange) onChange(value);
    if (setInfoAlert) {
      setInfoAlert('');
    }
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
        role="textbox"
      />
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              onClick={handleItemClicked}
              role="button"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
