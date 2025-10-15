import type { Ride } from '../types/ride';

type Props = {
  rides: Ride[];
};

function formatStartTime(startTime: Ride['startTime']) {
  if (!startTime) return 'TBD';
  if (typeof startTime === 'string') return startTime;
  // object by season
  const parts = Object.entries(startTime).map(([season, time]) => `${season}: ${time}`);
  return parts.join(' • ');
}

export default function RideList({ rides }: Props) {
  return (
    <div className="space-y-6">
      {rides.map((ride) => (
        <article key={ride.id} className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">
            {ride.name}
            {ride.website ? (
              <a href={ride.website} target="_blank" rel="noreferrer" className="ml-2 text-sm text-blue-600">
                (website)
              </a>
            ) : null}
          </h3>
          <div className="text-sm">{ride.day} — {formatStartTime(ride.startTime)}</div>
          {ride.notes ? <p className="mt-2 text-sm">{ride.notes}</p> : null}

          {ride.seasonDates ? (
            <div className="mt-2 text-sm">
              <strong>Season dates:</strong>
              <ul className="list-disc ml-5">
                {Object.entries(ride.seasonDates).map(([season, range]) => (
                  <li key={season}>{season}: {range?.start} — {range?.end}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {ride.groups.map((g) => (
              <div key={g.name} className="p-2 border rounded">
                <div className="font-medium">Group {g.name}</div>
                <div className="text-sm">{g.dropType === 'no-drop' ? 'No-drop' : 'Drop'}</div>
                <div className="text-sm">Avg: {g.avgSpeedMph} mph</div>
                <div className="mt-1 space-x-2">
                  {g.garminRoute ? (
                    <a className="text-sm text-blue-600" href={g.garminRoute} target="_blank" rel="noreferrer">Garmin</a>
                  ) : null}
                  {g.stravaRoute ? (
                    <a className="text-sm text-blue-600" href={g.stravaRoute} target="_blank" rel="noreferrer">Strava</a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
