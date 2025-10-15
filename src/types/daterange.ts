import { DateOnly } from "./dateonly";
import { TimeOnly } from "./timeonly";

export type DateRange = {
    start: DateOnly;
    end: DateOnly;
    startTime: TimeOnly;
}