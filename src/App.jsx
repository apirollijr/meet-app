// filepath: c:\www\meet\src\App.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import EventList from './components/EventList.jsx';
import { InfoAlert, ErrorAlert } from './components/Alert.jsx';
import { getEvents } from './api.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');
  const [currentNOE, setCurrentNOE] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await getEvents({ location: currentCity, pageSize: 200 });
        const limited = raw.slice(0, Number(currentNOE) || 32);
        if (active) setEvents(limited);
      } catch (error) {
        console.error('Error loading events:', error);
        if (active) setEvents([]);
      }
    })();
    return () => { active = false; };
  }, [currentCity, currentNOE]);

  return (
    <Container fluid className="app-container">
      <Row className="justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <div className="alerts-container">
            {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
          </div>
          <div className="controls-section">
            <Row className="g-3 align-items-center justify-content-center">
              <Col xs="auto">
                <CitySearch 
                  value={currentCity} 
                  onChange={setCurrentCity}
                  setInfoAlert={setInfoAlert}
                />
              </Col>
              <Col xs="auto">
                <NumberOfEvents
                  value={currentNOE}
                  onChange={setCurrentNOE}
                  setErrorAlert={setErrorAlert}
                />
              </Col>
            </Row>
          </div>
          <div className="event-list-section">
            <EventList events={events} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}