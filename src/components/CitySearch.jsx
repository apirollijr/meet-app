import React, { useState, useEffect } from 'react';

export default function CitySearch({ allLocations, setCurrentCity, setInfoAlert }) {
  const [query, setQuery] = useState("See all cities");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Add defensive check to ensure allLocations is an array
    if (Array.isArray(allLocations)) {
      setSuggestions(allLocations);
    }
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    
    // Add defensive check for allLocations
    if (!Array.isArray(allLocations)) {
      setQuery(value);
      return;
    }

    const filteredLocations = allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    if (setInfoAlert) {
      setInfoAlert(infoText);
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    if (setCurrentCity) {
      setCurrentCity(value);
    }
    if (setInfoAlert) {
      setInfoAlert("");
    }
  };

  // Hover effect styles
  const suggestionItemStyle = {
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '4px',
    margin: '2px 4px'
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#e9ecef';
    e.target.style.transform = 'translateX(4px)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.transform = 'translateX(0)';
  };

  return (
    <div id="city-search">
      <label htmlFor="city-search-input" className="form-label fw-bold text-secondary mb-2">
        Choose your nearest city:
      </label>
      <input
        type="text"
        className="city form-control"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        data-testid="city-search-input"
      />
      {showSuggestions ? (
        <ul 
          className="suggestions list-unstyled position-absolute bg-white border rounded shadow-sm" 
          style={{ 
            zIndex: 1000, 
            width: '100%',
            cursor: 'default',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '8px'
          }}
        >
          {/* Add defensive check for suggestions array */}
          {Array.isArray(suggestions) && suggestions.map((suggestion) => {
            return (
              <li
                className="px-3 py-2"
                onClick={handleItemClicked}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={suggestion}
                data-testid="suggestion-item"
                style={suggestionItemStyle}
              >
                {suggestion}
              </li>
            );
          })}
          <li 
            className="px-3 py-2" 
            key='See all cities' 
            onClick={handleItemClicked}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              ...suggestionItemStyle,
              borderTop: suggestions.length > 0 ? '1px solid #dee2e6' : 'none',
              marginTop: suggestions.length > 0 ? '8px' : '0',
              paddingTop: suggestions.length > 0 ? '12px' : '8px'
            }}
          >
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
