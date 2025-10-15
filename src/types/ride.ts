import { DateRange } from "./daterange";
import { Days } from "./days";
import { Group } from "./group";
import { RideTypes } from "./ridetypes";

export type Ride = {
  id: string;
  name: string;
  address: string;
  description: string;
  type: RideTypes;
  day: Days;
  seasons: DateRange[];
  groups: Group[];
  website: string;
}
