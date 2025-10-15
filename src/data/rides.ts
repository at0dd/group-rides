import { Days } from "@/types/days";
import { Ride } from "@/types/ride";
import { RideTypes } from "@/types/ridetypes";

export const rides: Ride[] = [
  {
    name: 'City Loop',
    description: 'Meet at the fountain by the park.',
    type: RideTypes.Road,
    day: Days.Wednesday,
    seasons: [
      { start: { month: 3, day: 15 }, end: { month: 6, day: 14 }, startTime: { hour: 6, minute: 0 } },
      { start: { month: 6, day: 15 }, end: { month: 9, day: 14 }, startTime: { hour: 6, minute: 30 } },
      { start: { month: 9, day: 15 }, end: { month: 12, day: 14 }, startTime: { hour: 6, minute: 0 } },
      { start: { month: 12, day: 15 }, end: { month: 3, day: 14 }, startTime: { hour: 7, minute: 0 } },
    ],
    groups: [
      { name: 'A', drop: true, avgSpeedMPH: 22, garminRoute: 'https://garmin.example.com/a', stravaRoute: 'https://strava.example.com/a' },
      { name: 'B', drop: true, avgSpeedMPH: 18, garminRoute: 'https://garmin.example.com/b', stravaRoute: 'https://strava.example.com/b' },
      { name: 'C', drop: false, avgSpeedMPH: 14, garminRoute: 'https://garmin.example.com/c', stravaRoute: 'https://strava.example.com/c' },
    ],
    website: 'https://example.com/rides/city-loop',
  },
  {
    name: 'City Loop 2',
    description: 'Meet at the fountain by the park.',
    type: RideTypes.Road,
    day: Days.Wednesday,
    seasons: [
      { start: { month: 3, day: 15 }, end: { month: 6, day: 14 }, startTime: { hour: 4, minute: 0 } },
      { start: { month: 6, day: 15 }, end: { month: 9, day: 14 }, startTime: { hour: 6, minute: 30 } },
      { start: { month: 9, day: 15 }, end: { month: 12, day: 14 }, startTime: { hour: 6, minute: 0 } },
      { start: { month: 12, day: 15 }, end: { month: 3, day: 14 }, startTime: { hour: 7, minute: 0 } },
    ],
    groups: [
      { name: 'A', drop: true, avgSpeedMPH: 22, garminRoute: 'https://garmin.example.com/a', stravaRoute: 'https://strava.example.com/a' },
      { name: 'B', drop: true, avgSpeedMPH: 18, garminRoute: 'https://garmin.example.com/b', stravaRoute: 'https://strava.example.com/b' },
      { name: 'C', drop: false, avgSpeedMPH: 14, garminRoute: 'https://garmin.example.com/c', stravaRoute: 'https://strava.example.com/c' },
    ],
    website: 'https://example.com/rides/city-loop',
  },
  {
    name: 'Coastal Cruiser',
    description: 'A scenic ride along the coast.',
    type: RideTypes.Road,
    day: Days.Saturday,
    seasons: [
      { start: { month: 4, day: 1 }, end: { month: 9, day: 30 }, startTime: { hour: 8, minute: 0 } }
    ],
    groups: [
      { name: 'A', drop: true, avgSpeedMPH: 20, stravaRoute: 'https://strava.example.com/coastal-a' },
      { name: 'B', drop: false, avgSpeedMPH: 15, stravaRoute: 'https://strava.example.com/coastal-b' },
    ],
    website: 'https://example.com/rides/coastal-cruiser'
  },
  {
    name: 'Sunday Social',
    description: 'A relaxed social ride for all levels.',
    type: RideTypes.Gravel,
    day: Days.Sunday,
    seasons: [
      { start: { month: 5, day: 1 }, end: { month: 9, day: 30 }, startTime: { hour: 9, minute: 0 } },
      { start: { month: 10, day: 1 }, end: { month: 4, day: 30 }, startTime: { hour: 10, minute: 0 } },
    ],
    groups: [
      { name: 'Social', drop: false, avgSpeedMPH: 12, garminRoute: 'https://garmin.example.com/social' }
    ],
    website: 'https://example.com/rides/sunday-social'
  }
];

export default rides;
