
import RideList from '../components/RideList';
import { rides } from '../data/rides';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Group Rides</h1>
      <RideList rides={rides} />
    </main>
  );
}
