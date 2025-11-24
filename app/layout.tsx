import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '@/lib/convexClient';

export const metadata = {
  title: 'AI Trip Planner',
  description: 'Plan trips with AI, maps & real-time itinerary',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-950 text-slate-50">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

