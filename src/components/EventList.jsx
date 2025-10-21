import React from 'react';
import Event from './Event';
import { Row, Col, Card } from 'react-bootstrap';

export default function EventList({ events }) {
  return (
    <div className="event-list-section">
      <div className="bg-white rounded p-4 shadow-sm">
        <h2 className="text-center mb-4 text-primary">Events</h2>
        <ul id="event-list" data-testid="event-list" role="list">
          <Row className="g-4">
            {events ? events.map((event, index) => (
              <Col key={`${event.id || index}`} lg={12} md={12} sm={12} role="listitem">
                <Card className="event-card h-100">
                  <Card.Body>
                    <Event event={event} />
                  </Card.Body>
                </Card>
              </Col>
            )) : null}
          </Row>
        </ul>
      </div>
    </div>
  );
}