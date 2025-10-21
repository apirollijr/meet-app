import React, { useState, useEffect } from 'react';

export default function CitySearch({ value, onChange, setInfoAlert }) {
  const [query, setQuery] = useState(value || 'all');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cities = [
    { id: 'all', name: 'See all cities', location: 'all' },
    { id: 'berlin', name: 'Berlin, Germany', location: 'Berlin, Germany' },
    { id: 'london', name: 'London, UK', location: 'London, UK' },
    { id: 'munich', name: 'Munich, Germany', location: 'Munich, Germany' },
    { id: 'paris', name: 'Paris, France', location: 'Paris, France' },
    { id: 'amsterdam', name: 'Amsterdam, Netherlands', location: 'Amsterdam, Netherlands' }
  ];

  useEffect(() => {
    setQuery(value === 'all' ? 'See all cities' : value || 'See all cities');
  }, [value]);

  const handleInputChanged = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    const filteredCities = cities.filter((city) => {
      return city.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    setSuggestions(filteredCities);
    setShowSuggestions(true);

    if (setInfoAlert) {
      if (!filteredCities.length) {
        setInfoAlert('We cannot find the city you are looking for. Please try another city.');
      } else {
        setInfoAlert('');
      }
    }
  };

  const handleItemClicked = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    if (setInfoAlert) {
      setInfoAlert('');
    }
    if (onChange) {
      onChange(suggestion.location);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    setSuggestions(cities);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="city-search-container">
      <label htmlFor="city-search" className="form-label fw-bold text-secondary mb-2">
        Select City
      </label>
      <div id="city-search" className="position-relative">
        <input
          type="text"
          className="city form-control"
          placeholder="Search for a city"
          value={query}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChanged}
          role="textbox"
          aria-label="City search"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
        />
        {showSuggestions && (
          <ul 
            className="suggestions list-unstyled"
            role="list"
          >
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="suggestion-item">
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleItemClicked(suggestion)}
                >
                  {suggestion.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
