import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import EventList from './components/EventList.jsx';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert.jsx';
import { getEvents } from './api.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');
  const [currentNOE, setCurrentNOE] = useState(32);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = async () => {
    try {
      const raw = await getEvents({ location: currentCity, pageSize: 200 });
      const limited = raw.slice(0, Number(currentNOE) || 32);
      setEvents(limited);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      // User is online - clear warning alert
      setWarningAlert("");
    } else {
      // User is offline - show warning about cached data
      setWarningAlert("The displayed list has been loaded from the cache and may not be up to date.");
    }
    
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <Container fluid className="app-container py-4">
      <Row className="justify-content-center">
        <Col lg={10} md={11} sm={12}>
          {/* App Header */}
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold text-primary mb-2">Meet App</h1>
            <p className="lead text-muted">Find and explore events in your city</p>
          </div>

          {/* Alerts Section */}
          <div className="alerts-container mb-4">
            {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
            {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
          </div>

          {/* Controls Section */}
          <div className="controls-section mb-4">
            <div className="bg-light rounded p-4 shadow-sm">
              <Row className="g-4 align-items-end">
                <Col md={8} sm={12}>
                  <CitySearch 
                    value={currentCity} 
                    onChange={setCurrentCity}
                    setInfoAlert={setInfoAlert}
                  />
                </Col>
                <Col md={4} sm={12}>
                  <NumberOfEvents
                    value={currentNOE}
                    onChange={setCurrentNOE}
                    setErrorAlert={setErrorAlert}
                  />
                </Col>
              </Row>
            </div>
          </div>

          {/* Events Section */}
          <div className="event-list-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">
                {currentCity === 'all' ? 'All Events' : `Events in ${currentCity}`}
              </h2>
              <span className="badge bg-secondary">{events.length} events</span>
            </div>
            <EventList events={events} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}