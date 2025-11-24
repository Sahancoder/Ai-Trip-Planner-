import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <p className="text-slate-400">Settings page coming soon...</p>
    </main>
  );
}

