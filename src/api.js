import mockData from "./mock-data";

export function extractLocations(events) {
  const locations = events.map((e) => e.location);
  return [...new Set(locations)];
}

export async function getEvents({ location = "all", pageSize = 32 } = {}) {
  const isLocal = typeof window !== "undefined" && window.location && String(window.location.href).startsWith("http://localhost");
  const isTest = process.env.NODE_ENV === "test";
  if (isLocal || isTest) {
    let events = mockData;
    if (location && location !== "all" && location !== "See all cities") {
      events = events.filter((e) => e.location === location);
    }
    return events.slice(0, pageSize);
  }
  return [];
}
