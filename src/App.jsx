import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import EventList from "./components/EventList";
import { getEvents } from "./api";
import "./App.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("all");
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(() => {
    const load = async () => {
      const data = await getEvents({ location: currentCity, pageSize: currentNOE });
      setEvents(data);
    };
    load();
  }, [currentCity, currentNOE]);

  return (
    <div className="app">
      <div className="container">
        <h1 className="app__title">Meet App</h1>
        <div className="controls">
          <CitySearch currentCity={currentCity} setCurrentCity={setCurrentCity} />
          <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
        </div>
        <EventList events={events} />
      </div>
    </div>
  );
}
