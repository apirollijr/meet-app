import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You are offline. Events may not be up to date.");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="app-container py-4">
      <Container fluid>
        <Row className="justify-content-center">
          <Col lg={10} md={11} sm={12}>
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-primary mb-2">Meet App</h1>
              <p className="lead text-muted">Find and explore events in your city</p>
            </div>

            <div className="alerts-container mb-4">
              {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
              {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
              {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
            </div>

            <div className="controls-section mb-4">
              <div className="bg-light rounded p-4 shadow-sm">
                <Row className="g-4 align-items-end">
                  <Col md={8} sm={12}>
                    <CitySearch 
                      allLocations={allLocations}
                      setCurrentCity={setCurrentCity}
                      setInfoAlert={setInfoAlert}
                    />
                  </Col>
                  <Col md={4} sm={12}>
                    <NumberOfEvents 
                      setCurrentNOE={setCurrentNOE}
                      setErrorAlert={setErrorAlert}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            <div className="charts-container">
              <div>
                <EventGenresChart events={events} />
              </div>
              <div>
                <CityEventsChart events={events} />
              </div>
            </div>

            <EventList events={events} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;