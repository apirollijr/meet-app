import mockData from './mock-data.js';

export async function getEvents({ location = 'all', pageSize = 200 } = {}) {
  // Small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 10));
  
  let data = mockData.slice(0, pageSize);
  
  if (location !== 'all') {
    data = data.filter(e =>
      e.location?.toLowerCase().includes(String(location).toLowerCase()) ||
      e.summary?.toLowerCase().includes(String(location).toLowerCase())
    );
  }
  
  return data;
}

export function extractLocations(events) {
  const set = new Set(events.map(e => e.location).filter(Boolean));
  return Array.from(set).sort();
}