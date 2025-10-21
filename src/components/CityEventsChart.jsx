import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CityEventsChart({ events }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [events]);

  const getData = () => {
    const locations = events.reduce((acc, event) => {
      const location = event.location || 'Unknown';
      const city = location.split(',')[0].trim();
      
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(locations).map(([city, count], index) => ({
      city,
      count,
      index: index
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow">
          <p className="label fw-bold mb-1">{`${data.city}`}</p>
          <p className="count mb-0">{`Events: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  if (!events || events.length === 0) {
    return (
      <div className="city-events-chart">
        <h3 className="chart-title text-center mb-4">Events by City</h3>
        <div className="text-center text-muted py-5">
          <p>No events data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="city-events-chart" data-testid="city-events-chart">
      <h3 className="chart-title text-center mb-4">Events by City</h3>
      <div className="chart-container" style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 60,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="category" 
              dataKey="city" 
              name="City"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="count" 
              name="Event Count"
              domain={[0, 'dataMax + 1']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              name="Events" 
              data={data} 
              fill="#0088FE"
              fillOpacity={0.8}
              stroke="#0088FE"
              strokeWidth={2}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}