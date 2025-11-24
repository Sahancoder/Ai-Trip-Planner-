'use client';

import { ConvexReactClient } from 'convex/react';
import { ReactNode, useMemo } from 'react';
import { ConvexProvider } from 'convex/react';

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      console.warn('NEXT_PUBLIC_CONVEX_URL is not set. Convex features will not work.');
      // Return a dummy client that won't crash
      return new ConvexReactClient('https://placeholder.convex.cloud');
    }
    return new ConvexReactClient(url);
  }, []);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

