// Types for group rides

export type DropType = 'drop' | 'no-drop';
export type GroupName = 'A' | 'B' | 'C' | string;

export interface Group {
  name: GroupName;
  dropType: DropType;
  avgSpeedMph: number; // average speed in mph
  // Links to specific group routes
  garminRoute?: string;
  stravaRoute?: string;
}

export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type StartTime = string | Partial<Record<Season, string>>;

export type DateRange = {
  start: string; // YYYY-MM-DD or human friendly
  end: string; // YYYY-MM-DD or human friendly
};

export interface Ride {
  id: string;
  name: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | string;
  startTime?: StartTime;
  // Optional map of season to date ranges for that ride (can differ per ride)
  seasonDates?: Partial<Record<Season, DateRange>>;
  groups: Group[];
  website?: string; // single website for the ride
  notes?: string;
}
