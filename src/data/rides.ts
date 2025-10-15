import type { Ride } from '../types/ride';

export const rides: Ride[] = [
  {
    id: 'ride-1',
    name: 'City Loop',
    day: 'Wednesday',
    startTime: { spring: '6:00 AM', summer: '6:30 AM', fall: '6:00 AM', winter: '7:00 AM' },
    seasonDates: {
      spring: { start: '2025-03-15', end: '2025-06-14' },
      summer: { start: '2025-06-15', end: '2025-09-14' },
      fall: { start: '2025-09-15', end: '2025-12-14' },
      winter: { start: '2025-12-15', end: '2026-03-14' },
    },
    groups: [
      { name: 'A', dropType: 'drop', avgSpeedMph: 22, garminRoute: 'https://garmin.example.com/a', stravaRoute: 'https://strava.example.com/a' },
      { name: 'B', dropType: 'drop', avgSpeedMph: 18, garminRoute: 'https://garmin.example.com/b', stravaRoute: 'https://strava.example.com/b' },
      { name: 'C', dropType: 'no-drop', avgSpeedMph: 14, garminRoute: 'https://garmin.example.com/c', stravaRoute: 'https://strava.example.com/c' },
    ],
    website: 'https://example.com/rides/city-loop',
    notes: 'Meet at the fountain by the park.'
  },
  {
    id: 'ride-2',
    name: 'Coastal Cruiser',
    day: 'Saturday',
    startTime: '8:00 AM',
    seasonDates: {
      spring: { start: '2025-04-01', end: '2025-09-30' }
    },
    groups: [
      { name: 'A', dropType: 'drop', avgSpeedMph: 20, garminRoute: 'https://garmin.example.com/coastal-a', stravaRoute: 'https://strava.example.com/coastal-a' },
      { name: 'B', dropType: 'no-drop', avgSpeedMph: 15, garminRoute: 'https://garmin.example.com/coastal-b', stravaRoute: 'https://strava.example.com/coastal-b' },
    ],
    website: 'https://example.com/rides/coastal-cruiser'
  },
  {
    id: 'ride-3',
    name: 'Sunday Social',
    day: 'Sunday',
    startTime: { summer: '9:00 AM', winter: '10:00 AM' },
    seasonDates: {
      summer: { start: '2025-05-01', end: '2025-09-30' },
      winter: { start: '2025-10-01', end: '2026-04-30' }
    },
    groups: [
      { name: 'Social', dropType: 'no-drop', avgSpeedMph: 12, garminRoute: 'https://garmin.example.com/social', stravaRoute: 'https://strava.example.com/social' }
    ],
  }
];

export default rides;
