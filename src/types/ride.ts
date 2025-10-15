import { DateRange } from "./daterange";
import { Days } from "./days";
import { Group } from "./group";
import { RideTypes } from "./ridetypes";

export type Ride = {
  name: string;
  description: string;
  type: RideTypes;
  day: Days;
  seasons: DateRange[];
  groups: Group[];
  website: string;
}
