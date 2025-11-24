import { auth } from '@clerk/nextjs';

/**
 * Get the current user's Clerk ID for server components
 */
export async function getCurrentUserId() {
  const { userId } = auth();
  return userId;
}

