import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import AppNavbar from '@/components/layout/AppNavbar';
import AppSidebar from '@/components/layout/AppSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppNavbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

