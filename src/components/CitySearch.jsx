import React, { useEffect, useState } from "react";

export default function CitySearch({ allLocations = [], setCurrentCity = () => {} }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = allLocations ? allLocations.filter((loc) => loc.toUpperCase().indexOf(value.toUpperCase()) > -1) : [];
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleItemClicked = (e) => {
    const value = e.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        className="city"
        type="text"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions ? (
        <ul className="suggestions" role="list">
          {suggestions.map((s) => (
            <li onClick={handleItemClicked} key={s}>{s}</li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}><b>See all cities</b></li>
        </ul>
      ) : null}
    </div>
  );
}
