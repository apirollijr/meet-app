import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import EventList from './components/EventList.jsx';
import { getEvents } from './api.js';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(() => {
    let active = true;
    (async () => {
      // Fetch a superset and trim locally so “up to N” is guaranteed.
      const raw = await getEvents({ location: currentCity, pageSize: 200 });
      const limited = raw.slice(0, Number(currentNOE) || 32);
      if (active) setEvents(limited);
    })();
    return () => { active = false; };
  }, [currentCity, currentNOE]);

  return (
    <div>
      <div className="controls">
        <CitySearch value={currentCity} onChange={setCurrentCity} />
        <NumberOfEvents
          value={currentNOE}
          onChange={(n) => setCurrentNOE(Number(n))}
        />
      </div>
      <EventList events={events} />
    </div>
  );
}
