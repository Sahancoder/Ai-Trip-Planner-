import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import TripForm from '@/components/trips/TripForm';

export default async function NewTripPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create New Trip</h1>
      <TripForm />
    </main>
  );
}

