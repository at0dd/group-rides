import { Link } from '@/components/link'
import rides from '@/data/rides'
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

async function RideType({ selected }: { selected?: string }) {
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
              href="/"
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
                href={`/?category=${rideType}`}
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

async function Ride({ category }: { category?: string }) {
  const ridesList = typeof category === 'string'
    ? rides.filter((r) => r.type === category)
    : [...rides]

  if (ridesList.length === 0) {
    return <p className="mt-6 text-gray-500">No rides found.</p>
  }

  return (
    <div className="mt-6">
      {ridesList.map((ride) => (
        <div
          key={ride.name}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {ride.day}s @ {convertTo12Hour(getCurrentSeasonStartTime(ride.seasons))}
            </div>
            <div className="mt-2.5 flex items-center gap-3">
                <div className="text-sm/5 text-gray-700">
                {ride.seasons.map(season => (
                  <div key={`${season.start.month}-${season.start.day}`} className="text-sm/5 text-gray-700">
                      {monthShort(season.start.month)} {season.start.day} - {monthShort(season.end.month)} {season.end.day}: {convertTo12Hour(season.startTime)}
                    </div>
                ))}
                </div>
              </div>
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-sm/5 font-medium">{ride.name}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">{ride.description}</p>
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
  const type = typeof params.category === 'string' ? params.category : undefined

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Header />
      <Container className="mt-16 pb-24">
        <RideType selected={type} />
        <Ride category={type} />
      </Container>
    </main>
  )
}
