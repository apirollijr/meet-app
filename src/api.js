
export async function getEvents({ location = 'all', pageSize = 32 } = {}) {
  const data = (await import('./mock-data.js')).default;

  const filtered = location === 'all'
    ? data
    : data.filter(e => e.location === location);

  return filtered.slice(0, Number(pageSize) || 32);
}
