import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Event from './Event';

export default function EventList({ events = [] }) {
  return (
    <div className="event-list-section">
      <Row className="g-4" role="list">
        {events.map(event => (
          <Col key={event.id} lg={12} md={12} sm={12} role="listitem">
            <Card className="event-card h-100">
              <Card.Body>
                <Event event={event} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}