export async function getEvents({ location = 'all', pageSize = 200 } = {}) {
  const sample = Array.from({ length: 50 }).map((_, i) => ({
    id: `p-${i + 1}`,
    summary: `Event ${i + 1}`,
    title: `Event ${i + 1}`,
    location: i % 2 ? 'Berlin, Germany' : 'London, UK',
    description: `Description ${i + 1}`,
    created: `2025-10-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`,
  }));
  let data = sample.slice(0, pageSize);
  if (location !== 'all') {
    data = data.filter(e =>
      e.location.toLowerCase().includes(String(location).toLowerCase()) ||
      e.summary.toLowerCase().includes(String(location).toLowerCase())
    );
  }
  return new Promise(resolve => setTimeout(() => resolve(data), 5));
}

export function extractLocations(events) {
  const set = new Set(events.map(e => e.location).filter(Boolean));
  return Array.from(set).sort();
}
