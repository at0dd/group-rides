import { Days } from "@/types/days";
import { Ride } from "@/types/ride";
import { RideTypes } from "@/types/ridetypes";

export const lastUpdate: string = 'Oct 17, 2025'

export const rides: Ride[] = [
  {
    id: '3-feet-cycling-monday',
    name: '3 Feet Cycling',
    address: '15983 S Bradley Dr, Olathe, KS 66062',
    description: '',
    type: RideTypes.Road,
    day: Days.Monday,
    seasons: [
      { start: { month: 6, day: 1 }, end: { month: 9, day: 30 }, startTime: { hour: 18, minute: 30 } },
    ],
    groups: [
      { name: 'A', drop: true, miles: '20', avgSpeed: '20+', stravaRoute: 'https://www.strava.com/routes/3344686331145351368' },
      { name: 'B Long', drop: true, miles: '20', avgSpeed: '19-20', stravaRoute: 'https://www.strava.com/routes/3344686331145351368' },
      { name: 'B Short', drop: true, miles: '19', avgSpeed: '17', stravaRoute: 'https://www.strava.com/routes/3364369237971588718' },
      { name: 'C', drop: false, miles: '17', avgSpeed: '14', stravaRoute: 'https://www.strava.com/routes/3367494224998475104' },
    ],
    website: 'https://www.facebook.com/3FeetCycling',
  },
  {
    id: '3-feet-cycling-tuesday',
    name: '3 Feet Cycling',
    address: '15983 S Bradley Dr, Olathe, KS 66062',
    description: '',
    type: RideTypes.Road,
    day: Days.Tuesday,
    seasons: [
      { start: { month: 6, day: 1 }, end: { month: 9, day: 30 }, startTime: { hour: 18, minute: 30 } },
    ],
    groups: [
      { name: 'A', drop: true, miles: '20', avgSpeed: '20+', stravaRoute: 'https://www.strava.com/routes/3344686331145351368' },
      { name: 'B Long', drop: true, miles: '20', avgSpeed: '19-20', stravaRoute: 'https://www.strava.com/routes/3344686331145351368' },
      { name: 'B Short', drop: true, miles: '19', avgSpeed: '17', stravaRoute: 'https://www.strava.com/routes/3364369237971588718' },
      { name: 'C', drop: false, miles: '17', avgSpeed: '14', stravaRoute: 'https://www.strava.com/routes/3367494224998475104' },
    ],
    website: 'https://www.facebook.com/3FeetCycling',
  },
  {
    id: 'southwind-cycle',
    name: 'Southwind Cycle',
    address: '13624 W 87th St Pkwy, Lenexa, KS 66215',
    description: 'Casual (No-Drop) / Mostly Flat',
    type: RideTypes.Road,
    day: Days.Tuesday,
    seasons: [
      { start: { month: 6, day: 1 }, end: { month: 10, day: 31 }, startTime: { hour: 18, minute: 0 } },
    ],
    groups: [
      { name: 'C', drop: false, miles: '20', avgSpeed: '14', rideWithGPSRoute: 'https://ridewithgps.com/routes/51501486' },
    ],
    website: 'https://www.strava.com/clubs/1550056',
  },
  {
    id: 'saturday-morning-outdoor-cycle-lenexa',
    name: 'Saturday Morning Outdoor Cycle Lenexa',
    address: '16851 W 90th St, Lenexa, KS 66219',
    description: 'Meet west of the pool! You do not have to be a Life Time member to join us for this group ride. But if you have a Life Time membership, please sign up for the ride via the Life Time app.',
    type: RideTypes.Road,
    day: Days.Saturday,
    seasons: [
      { start: { month: 4, day: 1 }, end: { month: 5, day: 14 }, startTime: { hour: 10, minute: 0 } },
      { start: { month: 5, day: 15 }, end: { month: 10, day: 31 }, startTime: { hour: 8, minute: 30 } },
    ],
    groups: [
      { name: 'B', drop: true, miles: '32', avgSpeed: '17+', garminRoute: 'https://connect.garmin.com/modern/course/335827455', stravaRoute: 'https://www.strava.com/routes/3393620085305145562' },
      { name: 'C', drop: true, miles: '30', avgSpeed: '15-16', garminRoute: 'https://connect.garmin.com/modern/course/335833801', stravaRoute: 'https://www.strava.com/routes/3393620301374193882' },
      { name: 'D', drop: false, miles: '19', avgSpeed: '13-14', garminRoute: 'https://connect.garmin.com/modern/course/335935846', stravaRoute: 'https://www.strava.com/routes/3393626182041043344' },
    ],
    website: 'https://www.facebook.com/groups/527018364118593',
  },
  {
    id: 'trek-shawnee-gravel',
    name: 'Trek Shawnee Weekly Wednesday Night Gravel Ride',
    address: '611 W 2nd St, Bonner Springs, KS 66102',
    description: 'We roll at 6:30 pm from Outfield Brewery in Bonner Springs.',
    type: RideTypes.Gravel,
    day: Days.Wednesday,
    seasons: [
      { start: { month: 4, day: 1 }, end: { month: 10, day: 31 }, startTime: { hour: 18, minute: 30 } },
    ],
    groups: [
      { name: 'A', drop: true, miles: '22', avgSpeed: '15-18', garminRoute: 'https://connect.garmin.com/modern/course/298474325' },
      { name: 'B', drop: false, miles: '22', avgSpeed: '12-15', garminRoute: 'https://connect.garmin.com/modern/course/335833801' },
    ],
    website: 'https://www.facebook.com/TrekBicycleShawnee/',
  },
  {
    id: 'velo-garage-thursty-thursday',
    name: 'Velo Garage and Tap House Thursty Thursday Ride',
    address: '1403 Swift St, North Kansas City, Missouri 64116',
    description: '**LIGHTS, helmet, and a spare tube are required!** We ask all riders to sign a waiver prior to riding with us, yearly. The spring DST time change marks our yearly roll over. If you\'re new, or if you\'ve signed the waiver before, but not since March 9th 2025, please see the bar to sign the waiver when you arrive.',
    type: RideTypes.Road,
    day: Days.Thursday,
    seasons: [
      { start: { month: 3, day: 1 }, end: { month: 2, day: 28 }, startTime: { hour: 18, minute: 30 } },
    ],
    groups: [
      { name: 'A', drop: true, miles: '17', avgSpeed: '16', stravaRoute: 'https://www.strava.com/clubs/1075540/group_events/3413221923251675568' },
      { name: 'B+', drop: true, miles: '19', avgSpeed: '14-15', stravaRoute: 'https://www.strava.com/clubs/1075540/group_events/3413621419115371392' },
      { name: 'B', drop: false, miles: '14', avgSpeed: '11-13', stravaRoute: 'https://www.strava.com/clubs/1075540/group_events/3413621692605242734' },
      { name: 'C', drop: false, miles: '10', avgSpeed: '10', stravaRoute: 'https://www.strava.com/clubs/1075540/group_events/3413626158377303788' },
    ],
    website: 'https://www.facebook.com/velogaragekc',
  }
];

export default rides;
