'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AppNavbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/40 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-semibold">
          AI Trip Planner
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}

