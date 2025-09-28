import React, { useEffect, useMemo, useState } from "react";
import { getEvents } from "../api";

export default function CitySearch({ currentCity, setCurrentCity }) {
  const [query, setQuery] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await getEvents({ location: "all", pageSize: 200 });
      const uniq = Array.from(new Set(data.map(e => e.location))).sort();
      setAllLocations(uniq);
    };
    init();
  }, []);

  useEffect(() => {
    if (currentCity === "all") setQuery("");
    else setQuery(currentCity);
  }, [currentCity]);

  const suggestions = useMemo(() => {
    if (!query) return allLocations;
    const q = query.toLowerCase();
    return allLocations.filter(loc => loc.toLowerCase().includes(q));
  }, [allLocations, query]);

  const applyCity = (city) => {
    setCurrentCity(city === "See all cities" ? "all" : city);
    setOpen(false);
  };

  return (
    <div id="city-search">
      <input
        className="city"
        type="text"
        placeholder="Search for a city"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul role="list" className="suggestions">
          <li onMouseDown={() => applyCity("See all cities")}>See all cities</li>
          {suggestions.map(loc => (
            <li key={loc} onMouseDown={() => applyCity(loc)}>{loc}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
