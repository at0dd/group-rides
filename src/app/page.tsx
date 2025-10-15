import { Link } from '@/components/link'
import rides from '@/data/rides'
import { Days } from '@/types/days'
import { RideTypes } from '@/types/ridetypes'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon
} from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import { Container } from '../components/container'
import { GradientBackground } from '../components/gradient'
import { Heading } from '../components/text'

const convertTo12Hour = (time?: { hour?: number; minute?: number }) => {
  if (!time || typeof time.hour !== 'number') return ''
  const minute = time.minute ?? 0
  return dayjs().hour(time.hour).minute(minute).format('h:mm a')
}

const isBetweenInclusive = (date: dayjs.Dayjs, start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  return (date.isAfter(start) || date.isSame(start, 'day')) && (date.isBefore(end) || date.isSame(end, 'day'))
}

/**
 * Find the startTime for the season that contains today's date.
 * Seasons may span the end of year (e.g., Dec -> Mar). We check the reasonable
 * candidate intervals for each season to determine if today falls inside.
 */
const getCurrentSeasonStartTime = (seasons?: { start: { month: number; day: number }; end: { month: number; day: number }; startTime?: { hour?: number; minute?: number } }[]) => {
  if (!seasons || seasons.length === 0) return undefined
  const now = dayjs()
  const currentYear = now.year()

  for (const season of seasons) {
    const { start, end } = season
    const startThisYear = dayjs().year(currentYear).month(start.month - 1).date(start.day).startOf('day')
    const endThisYear = dayjs().year(currentYear).month(end.month - 1).date(end.day).endOf('day')

    if (!startThisYear.isAfter(endThisYear)) {
      // Non-wrapping season (same calendar year)
      if (isBetweenInclusive(now, startThisYear, endThisYear)) return season.startTime
    } else {
      // Wrapping season (e.g., Dec -> Mar). Check two candidate intervals:
      // 1) start in previous year -> end in this year
      const startPrev = startThisYear.subtract(1, 'year')
      if (isBetweenInclusive(now, startPrev, endThisYear)) return season.startTime

      // 2) start in this year -> end in next year
      const endNext = endThisYear.add(1, 'year')
      if (isBetweenInclusive(now, startThisYear, endNext)) return season.startTime
    }
  }

  return undefined
}

const monthShort = (month?: number) => {
  if (typeof month !== 'number' || Number.isNaN(month)) return ''
  // dayjs months are 0-indexed, input months are 1-indexed in the data
  return dayjs().month(month - 1).format('MMM')
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Group Rides</Heading>
    </Container>
  )
}

async function DayFilter({ selectedDay, selectedType }: { selectedDay?: string; selectedType?: string }) {
  const days = Object.values(Days)
  if (days.length === 0) return

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {days.find((d) => d === selectedDay) || 'All days'}
          <ChevronUpDownIcon className="size-4 fill-gray-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={`/${selectedType ? `?type=${selectedType}` : ''}`}
              data-selected={selectedDay === undefined ? true : undefined}
              className="group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-selected:block" />
              <p className="col-start-2 text-sm/6">All days</p>
            </Link>
          </MenuItem>
          {days.map((day) => (
            <MenuItem key={day}>
              <Link
                href={`/?day=${day}${selectedType ? `&type=${selectedType}` : ''}`}
                data-selected={day === selectedDay ? true : undefined}
                className="group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-selected:block" />
                <p className="col-start-2 text-sm/6">{day}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

async function RideType({ selected, selectedDay }: { selected?: string; selectedDay?: string }) {
  const rideTypes = Object.values(RideTypes)
  if (rideTypes.length === 0) {
    return
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {rideTypes.find((rideType) => rideType === selected) || 'All types'}
          <ChevronUpDownIcon className="size-4 fill-gray-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={`/${selectedDay ? `?day=${selectedDay}` : ''}`}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-selected:block" />
              <p className="col-start-2 text-sm/6">All types</p>
            </Link>
          </MenuItem>
          {rideTypes.map((rideType) => (
            <MenuItem key={rideType}>
              <Link
                href={`/?type=${rideType}${selectedDay ? `&day=${selectedDay}` : ''}`}
                data-selected={rideType === selected ? true : undefined}
                className="group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-selected:block" />
                <p className="col-start-2 text-sm/6">{rideType}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

async function Ride({ type, day }: { type?: string; day?: string }) {
  const ridesList = [...rides].filter((r) => {
    if (typeof type === 'string' && type.length > 0 && r.type !== type) return false
    if (typeof day === 'string' && day.length > 0 && r.day !== day) return false
    return true
  })

  // Use the existing Days enum order to determine day index (preserves the enum's order)
  const daysArray = Object.values(Days)

  // Convert a TimeOnly-like object to minutes since midnight for easy comparison
  const minutesSinceMidnight = (time?: { hour?: number; minute?: number } | undefined) => {
    if (!time || typeof time.hour !== 'number') return Infinity
    const minute = typeof time.minute === 'number' ? time.minute : 0
    return time.hour * 60 + minute
  }

  // For each ride, determine the current season start time (if any) and use it for sorting.
  // Rides are sorted first by day (using the Days enum order) then by start time (earlier first).
  // Rides without a current season start time appear after rides with times.
  ridesList.sort((a, b) => {
    const dayA = Math.max(0, daysArray.indexOf(a.day as Days))
    const dayB = Math.max(0, daysArray.indexOf(b.day as Days))
    if (dayA !== dayB) return dayA - dayB

    const startA = getCurrentSeasonStartTime(a.seasons)
    const startB = getCurrentSeasonStartTime(b.seasons)
    const minsA = minutesSinceMidnight(startA)
    const minsB = minutesSinceMidnight(startB)
    if (minsA !== minsB) return minsA - minsB

    // Fallback: stable tiebreaker by ride name
    return a.name.localeCompare(b.name)
  })

  if (ridesList.length === 0) {
    return <p className="mt-6 text-gray-500">No rides found.</p>
  }

  return (
    <div className="mt-6">
      {ridesList.map((ride) => (
        <div
          key={ride.id}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {ride.day}s @ {convertTo12Hour(getCurrentSeasonStartTime(ride.seasons))}
            </div>
            <div className="mt-2.5 flex items-center gap-3">
                <div className="text-sm/5 text-gray-700">
                {ride.seasons
                  .slice()
                  .sort((a, b) => {
                    // Order seasons by start month/day to keep rendering stable
                    if (a.start.month !== b.start.month) return a.start.month - b.start.month
                    return a.start.day - b.start.day
                  })
                  .map((season) => (
                    <div
                      key={`${season.start.month}-${season.start.day}-${season.end.month}-${season.end.day}-${season.startTime?.hour ?? 'x'}-${season.startTime?.minute ?? 'x'}`}
                      className="text-sm/5 text-gray-700"
                    >
                      {monthShort(season.start.month)} {season.start.day} - {monthShort(season.end.month)} {season.end.day}: {convertTo12Hour(season.startTime)}
                    </div>
                  ))}
                </div>
              </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-sm/5 font-medium">{ride.name}</h2>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{ride.type}</span>
            </div>
            <p className="text-sm/6">{ride.address}</p>
            <p className="text-sm/6 text-gray-500">{ride.description}</p>
            {ride.website && (
              <div>
                <Link href={ride.website} className="text-sm/6 text-blue-600 hover:underline" target="_blank" rel="noreferrer">{ride.website}</Link>
              </div>
            )}
            {ride.groups && ride.groups.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm/5 font-medium">Groups</h3>
                <div className="mt-2 flex flex-wrap gap-3">
                  {ride.groups.map((group) => (
                    <div key={group.name} className="w-full sm:w-auto border border-gray-100 rounded-md px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-sm/5 font-medium">{group.name}</div>
                          {!group.drop && (
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">No-drop</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm/6 text-gray-600">
                        <div>{group.miles} miles</div>
                        <div>{group.avgSpeed} mph</div>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        {group.garminRoute && (
                          <Link href={group.garminRoute} className="text-sm/6 text-blue-600 hover:underline" target="_blank" rel="noreferrer">Garmin</Link>
                        )}
                        {group.stravaRoute && (
                          <Link href={group.stravaRoute} className="text-sm/6 text-blue-600 hover:underline" target="_blank" rel="noreferrer">Strava</Link>
                        )}
                        {group.rideWithGPSRoute && (
                          <Link href={group.rideWithGPSRoute} className="text-sm/6 text-blue-600 hover:underline" target="_blank" rel="noreferrer">Ride with GPS</Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const type = typeof params.type === 'string' ? params.type : undefined
  const day = typeof params.day === 'string' ? params.day : undefined

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Header />
      <Container className="mt-16 pb-24">
        <div className="flex items-center gap-4">
          <RideType selected={type} selectedDay={day} />
          <DayFilter selectedDay={day} selectedType={type} />
        </div>
        <Ride type={type} day={day} />
      </Container>
    </main>
  )
}
