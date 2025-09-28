import React, { useEffect, useMemo, useState } from "react";
import { getEvents } from "../api";

export default function CitySearch({
  currentCity = "all",
  setCurrentCity = () => {}
}) {
  const [query, setQuery] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await getEvents({ location: "all", pageSize: 200 });
      const uniq = Array.from(new Set(data.map((e) => e.location))).sort();
      setAllLocations(uniq);
    };
    init();
  }, []);

  useEffect(() => {
    setQuery(currentCity === "all" ? "" : currentCity);
  }, [currentCity]);

  const suggestions = useMemo(() => {
    const q = query.toLowerCase();
    return !q ? allLocations : allLocations.filter((l) => l.toLowerCase().includes(q));
  }, [allLocations, query]);

  const applyCity = (city) => {
    const value = city === "See all cities" ? "all" : city;
    setCurrentCity(value);
    setQuery(city === "See all cities" ? "See all cities" : city);
    setOpen(false);
  };

  return (
    <div id="city-search">
      <input
        className="city"
        placeholder="Search for a city"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul role="list" className="suggestions">
          {suggestions.map((loc) => (
            <li key={loc} onMouseDown={() => applyCity(loc)}>
              {loc}
            </li>
          ))}
          <li onMouseDown={() => applyCity("See all cities")}>See all cities</li>
        </ul>
      )}
    </div>
  );
}
